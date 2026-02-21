import Navbar from "../components/Navbar";
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

                console.log("FULL API RESPONSE:", data);

                /*
                  API structure is nested.
                  We safely extract the employee array from TABLE_DATA.data
                */
                if (
                    data &&
                    data.TABLE_DATA &&
                    Array.isArray(data.TABLE_DATA.data)
                ) {
                    setEmployees(data.TABLE_DATA.data);
                } else {
                    setEmployees([]);
                }

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
    if (error) return( <h3 style={{ color: "red" }}>{error}</h3>);

    return (
        <>
            <Navbar />

            <div style={{ padding: "20px" }}>
                <h2>style={{marginBottom: "20px"}}Employee List</h2>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((emp, index) => (
                            <tr key={index}>
                                <td>{emp[3]}</td>
                                <td>{emp[0]}</td>
                                <td>{emp[1]}</td>

                                <td style={styles.td}>
                                    <button
                                        style={styles.button}
                                        onClick={() =>
                                            navigate(`/details/${emp[3]}`, { state: emp })
                                        }
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ marginTop: "20px" }}>
                    <button
                        style={styles.secondaryButton} 
                        onClick={() => navigate("/chart")}
                    >
                        View Salary Chart
                    </button>

                    <button
                        style={{ ...styles.secondaryButton, marginLeft: "10px" }}
                        onClick={() => navigate("/map")}
                    >
                        View City Map
                    </button>
                </div>
            </div>
        </>
    );
};

const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  th: {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#f5f5f5",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "12px",
  },
  button: {
    padding: "6px 12px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  secondaryButton: {
    padding: "8px 14px",
    backgroundColor: "#555",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default List;