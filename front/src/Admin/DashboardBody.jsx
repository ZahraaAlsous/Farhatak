import React, { useEffect, useState } from "react";
import { BarChart, LineChart, PieChart, DoughnutChart } from "./Charts.jsx";
import axios from "axios";

const DashboardBody = () => {
  const [bookingStatusCounts, setBookingStatusCounts] = useState([]);
  const [topServices, setTopServices] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get("http://localhost:3000/api/getBookingStatusCounts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBookingStatusCounts(response.data);
      })
      .catch((error) => {
        console.log(`Error Getting Data ${error}`);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get("http://localhost:3000/api/getTopServicesByBookingVolume", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTopServices(response.data);
      })
      .catch((error) => {
        console.log(`Error Getting Data ${error}`);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome, Admin!</h1>

      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-6 bg-white rounded shadow">Card 1</div>
        <div className="p-6 bg-white rounded shadow">Card 2</div>
        <div className="p-6 bg-white rounded shadow">Card 3</div>
        <div className="p-6 bg-white rounded shadow">Card 4</div>
      </div> */}

      {/* Charts Row 1: Bar and Line */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white rounded shadow h-[450px] flex items-center justify-center">
          <BarChart topServices={topServices} />
        </div>
        <div className="p-6 bg-white rounded shadow h-[450px] flex items-center justify-center">
          <LineChart />
        </div>
      </div>

      {/* Charts Row 2: Pie and Doughnut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded shadow h-[450px] flex items-center justify-center">
          <div className="w-full h-full max-w-md">
            <PieChart />
          </div>
        </div>

        <div className="p-6 bg-white rounded shadow h-[450px] max-h-[450px] flex items-center justify-center">
          <DoughnutChart bookingData={bookingStatusCounts} />
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
