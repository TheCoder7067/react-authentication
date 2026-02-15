import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Loader } from "lucide-react";
import { useUpdateUserMutation } from '../../store/api/userApi';

const Edit = ({ user, onClose }) => {

  const [formData, setFormData] = useState({ ...user });
  const [preview, setPreview] = useState(
         user?.user_image ? user.user_image : null
      );
  
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleImageChange = (e) => {
        const file = e.target.files[0]; 
        setFormData({...formData, user_image: file});
        if(file) setPreview(URL.createObjectURL(file));
    }

  const handleFormData = (e) => {
     const {name, value} = e.target;
     setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

       const data = new FormData();
       data.append("name", formData.name);
       data.append("mobile", formData.mobile);
       data.append("email", formData.email);
       data.append("password", formData.password);
       data.append("address", formData.address);
       if (formData.user_image) {
            data.append("user_image", formData.user_image);
        }

       try {
          await updateUser({id: user.userId, formData: data}).unwrap();
          window.toast("success", "Update Success!", "User updated successfully!");   
          onClose();
       } catch (error) {
          window.toast("error", "Error", error?.data?.message || "Update failed!")
       } 

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex justify-center mb-8">
        <label className="relative cursor-pointer group">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl flex items-center justify-center overflow-hidden bg-slate-100 group-hover:border-indigo-500 transition-all duration-300">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" alt="preview" />
            ) : (
              <User className="text-slate-300" size={40} />
            )}
            <div className="absolute inset-0  flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <Camera className="text-white" size={24} />
            </div>
          </div>
          <input type="file" name="user_image" className="hidden" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleFormData}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-medium text-slate-700" 
            />
          </div>
        </div>

        {/* Email & Mobile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleFormData}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-medium text-slate-700" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Mobile</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                name="mobile"
                value={formData.mobile}
                onChange={handleFormData}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-medium text-slate-700" 
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Address</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
            <textarea 
              name="address"
              value={formData.address}
              onChange={handleFormData}
              rows="3" 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all resize-none font-medium text-slate-700"
            ></textarea>
          </div>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="flex gap-3 pt-6 border-t border-slate-50">
        <button 
          type="button" 
          onClick={onClose} 
          className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isLoading}
          className="flex-1 w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? ( 
            <>
             <Loader className="animate-spin" size={20} />
             <span>Waiting...</span>
            </>
          ) : (
             "Save Changes"
          )}
          
        </button>
      </div>
    </form>
  );
};

export default Edit;