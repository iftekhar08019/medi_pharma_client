import React from "react";
import Sidebar from "../pages/Dashboard/Sidebar";
import { Outlet } from "react-router";
import Logo from "../utility/Logo";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-2/3">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
