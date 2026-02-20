import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchEmployeeData } from "../services/api";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartPage = () => {
  const [chartData, setChartData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchEmployeeData();

        /*
          Extract first 10 employees from nested array
          Structure:
          [0] → Name
          [5] → Salary (string like "$320,800")
        */
        const employees = data.TABLE_DATA.data.slice(0, 10);

        const names = employees.map(emp => emp[0]);

        // Convert salary string to number
        const salaries = employees.map(emp =>
          Number(emp[5].replace(/[$,]/g, ""))
        );

        setChartData({
          labels: names,
          datasets: [
            {
              label: "Salary",
              data: salaries,
              backgroundColor: "rgba(25, 118, 210, 0.6)",
            },
          ],
        });

      } catch (error) {
        console.error("Error loading chart data:", error);
      }
    };

    loadData();
  }, []);

  if (!chartData) return <h3>Loading Chart...</h3>;

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        ...
        <div style={{ padding: "20px" }}>
          <h2>Top 10 Employee Salaries</h2>

          <Bar data={chartData} />

          <button
            style={{
              marginTop: "20px",
              padding: "8px 12px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/list")}
          >
            Back to List
          </button>
        </div>
      </div>
    </>
  );
};

export default ChartPage;