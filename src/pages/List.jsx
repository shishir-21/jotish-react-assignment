import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployeeData } from "../services/api";

const List = () => {
  // State to store employee data
  const [employees, setEmployees] = useState([]);

  // State to manage loading indicator
  const [loading, setLoading] = useState(true);

  // State to manage API error
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch data when component loads
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchEmployeeData();

        console.log("API RESPONSE:", data);
        // Assuming API returns array of employees
        setEmployees(data.TABLE_DATA.data);
      } catch (err) {
        setError("Failed to fetch employee data.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Show loading message
  if (loading) return <h3>Loading data...</h3>;

  // Show error message if API fails
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List</h2>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>

              <td>
                {/* Navigate to details page */}
                <button
                  onClick={() =>
                    navigate(`/details/${emp.id}`, { state: emp })
                  }
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navigation Buttons for Creativity Section */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/chart")}>
          View Salary Chart
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/map")}
        >
          View City Map
        </button>
      </div>
    </div>
  );
};

export default List;