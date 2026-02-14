import React, { useState } from 'react'
import { Camera, Loader } from "lucide-react";
import { useRegisterMutation } from '../../store/api/authApi';

const Signup = ({ showLogin }) => {
    
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        address: '',
        user_image: null
    });

    const [RegisterUser, {isLoading, error}] = useRegisterMutation();; 

    const handleImageChange = (e) => {
        const file = e.target.files[0]; 
        setFormData({...formData, user_image: file});
        if(file) setPreview(URL.createObjectURL(file));
    }

    const handleFormData = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleSignup = async (e) => {
       e.preventDefault();
       
       const data = new FormData();
       data.append("name", formData.name);
       data.append("mobile", formData.mobile);
       data.append("email", formData.email);
       data.append("password", formData.password);
       data.append("address", formData.address);
       data.append("user_image", formData.user_image);
       
       try {
         const res = await RegisterUser(data).unwrap();
         window.toast("success", "Account Created!", res.message);
         showLogin();
       } catch (error) {
          console.error("Signup Error:", error);
          window.toast("error", "Error", error.data?.message || "Server Error");
       }
    }
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
          <p className="text-slate-500 text-sm">Join us today!</p>
        </div>

        <form className="space-y-4">
          {/* --- Image Preview Circle --- */}
          <div className="flex justify-center mb-6">
            <label className="relative cursor-pointer group">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50 group-hover:border-indigo-500 transition-all">
                {preview ? (
                    <img src={preview} className="w-full h-full object-cover" alt="preview" />
                ) : ( 
                    <Camera className="text-slate-400" size={30} />
                )}                 
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange}/>
              
              {/* Chota Badge Icon */}
              <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full border-2 border-white">
                <Camera size={12} />
              </div>
            </label>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <input type="text" name="name" onChange={handleFormData} placeholder="Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500" />
            <input type="text" name="mobile" onChange={handleFormData} placeholder="Mobile" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500" />
          </div>

          <input type="email" name="email" onChange={handleFormData} placeholder="Email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500" />
          
          <input type="password" name="password" onChange={handleFormData} placeholder="Password" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500" />
          
          <textarea placeholder="Address" name="address" onChange={handleFormData} rows="2" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 resize-none" />

         <button 
            type="submit"
            disabled={isLoading}
            onClick={handleSignup} 
            className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" size={20} />
                <span>Waiting...</span>
              </>
            ): (
               "Sign Up"
            )}              
          </button>

          <p className="text-center text-sm text-slate-600">
            Already have an account? <button onClick={showLogin} className="text-indigo-600 font-bold">Login</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup