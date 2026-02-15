import React from 'react'
import { Search,  Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useGetUsersQuery } from '../store/api/userApi';
import UserList from '../components/users/UserList';

const Dashboard = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  
  const { data: users, isLoading, error } = useGetUsersQuery();

  const handleLogout = () => {
    dispatch(logout());
    window.toast("success", "Logged Out", "See you again soon!");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Page Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">User Management</h1>
            <p className="text-slate-500 text-sm">View and manage all registered accounts</p>
        </div>
        
        <div className="flex items-center gap-3">
            {/* Search Input Box */}
            <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl w-full md:w-64 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
            />
            </div>

            {/* Logout Button (Design Only) */}
            <button onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-600 font-semibold rounded-2xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm active:scale-95"
            title="Sign Out"
            >
            <span className="hidden md:block text-sm">Logout</span>
            <div className="p-1 bg-rose-100 text-rose-600 rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </div>
            </button>
        </div>
        </div>

        {/* --- Table Container --- */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <UserList
            users={users} 
            isLoading={isLoading}
            error={error}
          />
          <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">
              Total Records: <span className="text-slate-600">{users ? users.length : 0}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;