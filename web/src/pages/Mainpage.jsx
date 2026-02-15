import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const Mainpage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden flex-col md:flex-row">
      {/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}

      <div className="flex flex-col flex-1 overflow-hidden relative">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="mx-auto min-h-[calc(100vh-160px)]">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Mainpage;
