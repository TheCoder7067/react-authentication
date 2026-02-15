import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Popup = ({ isOpen, onClose, title, children, type = "side" }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const overlayClass = `fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-500 ${
    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
  }`;

  const sideStyles = `fixed right-0 top-0 h-full w-full max-w-lg border-l border-slate-100 transition-transform duration-500 ease-in-out ${
    isOpen ? 'translate-x-0' : 'translate-x-full'
  }`;

  const centerStyles = `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md rounded-[2.5rem] transition-all duration-300 ${
    isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
  }`;

  return (
    <>
      <div className={overlayClass} onClick={onClose} />
      
      <div className={`z-[70] bg-white shadow-2xl overflow-hidden ${type === "side" ? sideStyles : centerStyles}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50">
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-all">
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[85vh]">
          {children}
        </div>
      </div>
    </>
  );
};

export default Popup;