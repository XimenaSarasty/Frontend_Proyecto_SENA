import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";

const Dashboard = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar sidebarToggle={sidebarToggle} />
      <div
        className={`flex flex-col flex-grow p-6 bg-gray-100 ${
          sidebarToggle ? "ml-64" : ""
        } mt-16`}
      >
        <Home
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
          <div className="flex justify-end mt-2">
            <button
              className="btn-primary"
            >
              Agregar Categoria
            </button>
              <div className="flex-grow flex items-center justify-center">
                <div className="max-w-6xl mx-auto">

                  <h1>Hello World desde el dashboard</h1>
                </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
