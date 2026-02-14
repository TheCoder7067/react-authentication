import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../store/api/authApi'
import { useDispatch } from 'react-redux';
import { Loader } from 'lucide-react';
import { setCredentials } from '../../store/slices/authSlice';

const Login = ({ showSignup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: ''});

  const [loginUser, {isLoading, error}] = useLoginMutation();
  const dispatch = useDispatch();
  
  const handleFormData = (e) => {
      const {name, value} = e.target;
      setFormData({...formData, [name]: value});
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
       const res = await loginUser(formData).unwrap();

       dispatch(setCredentials({
            user: res.user,
            token: res.token
        }));
       window.toast("success", "Welcome Back!", "Login Successfull...");
       navigate("dashboard");

    } catch (error) {
      console.log("Authentication Error:", error);
      window.toast("error", "Authentication Error", error.data?.message || "Server Error");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">Please enter your details</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              name="email" 
              onChange={handleFormData} 
              placeholder="you@example.com"
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleFormData}
              placeholder="••••••••"
              className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-indigo-600" />
              Remember me
            </label>
            <button onClick={showSignup} className="text-indigo-600 font-bold hover:text-indigo-700">
              Create Account?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            onClick={handleLogin}
            className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Waiting...</span>
            </>
            ) : (
               "Login Now"  
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login