import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  // Get employee data passed via navigation
  const location = useLocation();
  const navigate = useNavigate();

  const employee = location.state;

  // If user refreshes page and no state exists
  if (!employee) {
    return <h3>No employee data found.</h3>;
  }

  /*
    Employee array structure:
    [0] → Name
    [1] → Position
    [2] → City
    [3] → ID
    [4] → Joining Date
    [5] → Salary
  */

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Details</h2>

      <div style={styles.card}>
        <p><strong>Name:</strong> {employee[0]}</p>
        <p><strong>Position:</strong> {employee[1]}</p>
        <p><strong>City:</strong> {employee[2]}</p>
        <p><strong>Employee ID:</strong> {employee[3]}</p>
        <p><strong>Joining Date:</strong> {employee[4]}</p>
        <p><strong>Salary:</strong> {employee[5]}</p>

        {/* Button to capture photo */}
        <button
          style={styles.button}
          onClick={() => navigate("/photo-result")}
        >
          Capture Photo
        </button>

        {/* Back Button */}
        <button
          style={{ ...styles.button, backgroundColor: "gray", marginLeft: "10px" }}
          onClick={() => navigate("/list")}
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: "20px",
    backgroundColor: "#f4f6f8",
    borderRadius: "8px",
    width: "400px",
  },
  button: {
    marginTop: "15px",
    padding: "8px 12px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Details;