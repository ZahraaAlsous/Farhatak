import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

// Sample data (replace with real data as needed)
const labels = ["Jan", "Feb", "Mar", "Apr", "May"];

export const BarChart = ({ topServices }) => {
  const labels = topServices?.map(service => service.serviceId || "Unknown");
  const counts = topServices?.map(service => service.bookingCount || 0);

  if (!topServices || topServices.length === 0) {
    return <p>No services data available for chart</p>;
  }

  return (
    <Bar
      data={{
        labels,
        datasets: [
          {
            label: "Booking Count",
            data: counts,
            backgroundColor: "rgba(59, 130, 246, 0.6)",
          },
        ],
      }}
      options={{ responsive: true }}
    />
  );
};

export const LineChart = () => (
  <Line
    data={{
      labels,
      datasets: [
        {
          label: "Visitors",
          data: [400, 500, 300, 600, 700],
          borderColor: "rgba(16, 185, 129, 1)", // Tailwind green-500
          backgroundColor: "rgba(16, 185, 129, 0.2)",
        },
      ],
    }}
    options={{ responsive: true }}
  />
);

export const PieChart = ({ servicesCount }) => {
  if (!servicesCount || servicesCount.length === 0) {
    return <p>Loading chart...</p>;
  }

  const labels = servicesCount.map((service) => service.title);
  const dataValues = servicesCount.map((service) => service.count);

  const data = {
    labels,
    datasets: [
      {
        label: 'Services by Title',
        data: dataValues,
        backgroundColor: [
          '#60a5fa', // blue
          '#f87171', // red
          '#fbbf24', // yellow
          '#34d399', // green
          '#c084fc', // purple
          '#f472b6', // pink
          '#facc15', // amber
          '#38bdf8', // sky
        ],
        borderWidth: 1,
      },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="w-full h-full relative">
      <Pie data={data} options={options} />
    </div>
  );
};


export const DoughnutChart = ({ bookingData }) => {
  // Assuming bookingData is like: [{status: 'Pending', count: 300}, ...]

  // Extract labels and counts dynamically
  const labels = bookingData.map(item => item.status);
  const data = bookingData.map(item => item.count);

  const backgroundColors = [
    "rgba(59, 130, 246, 0.7)",   // blue
    "rgba(251, 191, 36, 0.7)",   // amber
    "rgba(34, 197, 94, 0.7)",    // green
    "rgba(239, 68, 68, 0.7)",    // red
  ];

  return (
    <Doughnut
      data={{
        labels,
        datasets: [
          {
            label: "Bookings",
            data,
            backgroundColor: backgroundColors.slice(0, labels.length),
          },
        ],
      }}
      options={{ responsive: true }}
    />
  );
};
