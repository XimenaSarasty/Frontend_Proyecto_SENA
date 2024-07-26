import React from "react";
import Navbar from "../components/Navbar";

const Dashboard = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <div className={`flex flex-col flex-grow ${sidebarToggle ? "" : "ml-64"}`}>
      <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
      />
    </div>
  );
};

export default Dashboard;
