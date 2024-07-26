import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <>
      <Sidebar sidebarToggle={sidebarToggle} />
      <Dashboard
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    </>
  );
};

export default Home;
