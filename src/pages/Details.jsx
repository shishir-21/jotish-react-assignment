import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const employee = location.state;

  // Reference for webcam
  const webcamRef = useRef(null);

  // State to control camera visibility
  const [showCamera, setShowCamera] = useState(false);

  // If no employee data found
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

  // Function to capture image
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Navigate to photo result page with image
    navigate("/photo-result", { state: imageSrc });
  };

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

        {/* Toggle Camera */}
        {!showCamera ? (
          <button
            style={styles.button}
            onClick={() => setShowCamera(true)}
          >
            Open Camera
          </button>
        ) : (
          <>
            {/* Webcam Component */}
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
            />

            <br />

            <button style={styles.button} onClick={capturePhoto}>
              Capture Photo
            </button>

            <button
              style={{ ...styles.button, backgroundColor: "gray", marginLeft: "10px" }}
              onClick={() => setShowCamera(false)}
            >
              Close Camera
            </button>
          </>
        )}

        <br />

        <button
          style={{ ...styles.button, backgroundColor: "black" }}
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