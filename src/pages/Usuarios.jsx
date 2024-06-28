import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

const Usuarios = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar sidebarToggle={sidebarToggle} />
      <div className="flex-grow p-6 bg-gray-100">
        <Dashboard 
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle} 
        />
        <h1 className="text-xl font-bold">HELLO WORLD DESDE LOS USUARIOS</h1>
      </div>
    </div>
  );
}

export default Usuarios;
