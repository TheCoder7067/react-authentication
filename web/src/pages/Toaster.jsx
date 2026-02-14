import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, title, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    
    // Auto remove after 4 seconds
    setTimeout(() => removeToast(id), 4000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    window.toast = addToast;
  }, [addToast]);

  const config = {
    success: { bg: "bg-emerald-50", border: "border-emerald-200", iconBg: "bg-emerald-500", icon: <CheckCircle2 className="w-4 h-4 text-white" />, titleColor: "text-emerald-900" },
    error: { bg: "bg-red-50", border: "border-red-200", iconBg: "bg-red-500", icon: <AlertCircle className="w-4 h-4 text-white" />, titleColor: "text-red-900" }
  };

  return (
    <>
      <style>
        {`
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.95); }
          }
          .animate-toast-in {
            animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-toast-out {
            animation: fadeOut 0.3s ease forwards;
          }
        `}
      </style>

      <div className="fixed top-6 right-6 z-[1000000] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => {
          const style = config[toast.type] || config.success;
          return (
            <div 
              key={toast.id} 
              className={`flex items-center w-80 p-3.5 rounded-2xl shadow-2xl ${style.bg} border ${style.border} pointer-events-auto animate-toast-in`}
            >
              <div className="flex items-center gap-3 w-full">
                {/* Icon Container */}
                <div className={`flex-shrink-0 w-9 h-9 ${style.iconBg} rounded-xl flex items-center justify-center shadow-lg shadow-black/5`}>
                  {style.icon}
                </div>
                
                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-[14px] font-bold ${style.titleColor} leading-tight`}>{toast.title}</p>
                  <p className="text-[12px] text-slate-600 leading-tight mt-1 opacity-90">{toast.message}</p>
                </div>
                
                {/* Close Button */}
                <button 
                  onClick={() => removeToast(toast.id)} 
                  className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-black/5 rounded-lg transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Toaster;