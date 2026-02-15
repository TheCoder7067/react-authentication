import React, { useState } from 'react'
import { Search, User, Mail, Phone, MapPin, Edit2, Trash2, Loader2 } from "lucide-react";
import Popup from './Popup';
import Edit from './Edit';
import { useDeleteUserMutation } from '../../store/api/userApi';

const UserList = ({ users, isLoading, error }) => {
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser.userId).unwrap();
      window.toast("success", "Delete Success!", "User Delete Successful...");
      setIsDeleteModalOpen(false); 
    } catch (err) {
      window.toast("error", "Delete Failed!", "User Delete Failed!");
    }
  };


   if (isLoading) return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
          <p className="text-slate-500 font-medium">Loading users list...</p>
        </div>
      </div>
    );
  
    if (error) return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 shadow-sm">
          <p className="font-bold text-lg">Error loading data!</p>
          <p className="text-sm opacity-80">{error.data?.message || "Please check your server connection."}</p>
        </div>
      </div>
    );
  return (
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
            
                <tr key={i} className="group hover:bg-indigo-50/30 transition-all">
                    {/* Profile Section */}
                    <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {user.user_image ? (
                            <img src={user.user_image} alt={user.name}
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
                        <button onClick={() => openEditModal(user)} title="Edit" className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl hover:shadow-md transition-all">
                        <Edit2 size={18} />
                        </button>
                        <button onClick={() => openDeleteModal(user)} title="Delete" className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl hover:shadow-md transition-all">
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

        <Popup 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
            title="Edit User Info"
            type="side">
            <Edit key={selectedUser?.userId} user={selectedUser} onClose={() => setIsEditModalOpen(false)} />       
        </Popup>

        <Popup 
            isOpen={isDeleteModalOpen} 
            onClose={() => setIsDeleteModalOpen(false)} 
            title="Confirm Delete" type="center">
            <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center">
                    {isDeleting ? <Loader2 className="animate-spin" size={32} /> : <Trash2 size={32} />}
                </div>
                <p className="text-slate-600">Kya aap sach mein <span className="font-bold">{selectedUser?.name}</span> ko delete karna chahte hain?</p>
                
                <div className="flex gap-3 pt-4">
                    <button 
                        disabled={isDeleting}
                        onClick={() => setIsDeleteModalOpen(false)} 
                        className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-colors"
                    >
                        No, Cancel
                    </button>
                    <button 
                        disabled={isDeleting}
                        onClick={handleDelete}
                        className="flex-1 py-3 bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-200 hover:bg-rose-700 transition-colors disabled:opacity-50"
                    >
                        {isDeleting ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </div>
        </Popup>
        </div>
  )
}

export default UserList