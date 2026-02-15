import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
// Aap apni logout action import karein
// import { logout } from '../redux/authSlice'; 

const Header = () => {
    const { user } = useSelector((state) => state.auth); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        window.toast("success", "Logged Out", "See you again soon!");
    };

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="text-xl font-bold text-blue-600">
                <Link to="/">TheCoder</Link>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-700">Hi, {user.name}</span>
                            <img 
                                src={user.user_image || 'https://via.placeholder.com/40'} 
                                alt="Profile" 
                                className="w-10 h-10 rounded-full border border-slate-200 object-cover"
                            />
                        </div>
                         <button onClick={handleLogout}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-600 font-semibold rounded-2xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm active:scale-95"
                                    title="Sign Out"
                                    >
                                    <span className="hidden md:block text-sm">Logout</span>
                                    <div className="p-1 bg-rose-100 text-rose-600 rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                                    </div>
                                    </button>
                    </>
                ) : (
                    <div className="space-x-4">
                        <Link to="/login" className="text-slate-600 hover:text-blue-600">Login</Link>
                        <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded">Signup</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;