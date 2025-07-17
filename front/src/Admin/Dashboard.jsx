import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardBody from "./DashboardBody";

const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="p-4 overflow-auto">
            <DashboardBody />
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
