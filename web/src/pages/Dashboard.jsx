import React from 'react'
import { Search, User, Mail, Phone, MapPin, Edit2, Trash2, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useGetUsersQuery } from '../store/api/userApi';

const Dashboard = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  
  const { data: users, isLoading, isError, error } = useGetUsersQuery(); 

  const handleLogout = () => {
    dispatch(logout());
    window.toast("success", "Logged Out", "See you again soon!");
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
        <p className="text-slate-500 font-medium">Loading users list...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 shadow-sm">
        <p className="font-bold text-lg">Error loading data!</p>
        <p className="text-sm opacity-80">{error.data?.message || "Please check your server connection."}</p>
      </div>
    </div>
  );
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
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">User Profile</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Contact & Auth</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Location</th>
                  <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-right">Settings</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-50">
               { users && users.length > 0 ? (
                   users.map((user, i) => (
               
                    <tr  className="group hover:bg-indigo-50/30 transition-all">
                      {/* Profile Section */}
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex-shrink-0 flex items-center justify-center">
                           {user.user_image ? (
                              <img src={`http://localhost:5000/${user.user_image}`} alt={user.name}
                                onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150?text=User" }}
                                className="w-full h-full object-cover"/>
                           ) : (
                              <User size={24} className="text-slate-300" /> 
                           )}                          
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 text-base">{user.name}</h3>
                            <div className="text-[10px] text-slate-400 font-mono italic">ID: {user.userId}</div>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase mt-1 ${user.status === 1 ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                             {user.status === 1 ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail size={14} className="text-indigo-400" />
                            <span className="font-medium">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone size={14} className="text-slate-400" />
                            <span>{user.mobile}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-6">
                        <div className="flex items-start gap-2 text-sm text-slate-500 max-w-[180px]">
                          <MapPin size={16} className="text-rose-400 shrink-0 mt-0.5" />
                          <p className="line-clamp-2 italic">{user.address || "No address provided"}</p>
                        </div>
                      </td>

                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end items-center gap-1">
                          <button title="Edit" className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl hover:shadow-md transition-all">
                            <Edit2 size={18} />
                          </button>
                          <button title="Delete" className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl hover:shadow-md transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                 ))
               ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-20 text-slate-400 font-medium">No users found in database.</td>
                  </tr>
                )}
               
              </tbody>
            </table>
          </div>

          {/* --- Footer (Dynamic Count) --- */}
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