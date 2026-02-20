import { useLocation, useNavigate } from "react-router-dom";

const PhotoResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const image = location.state;

  if (!image) {
    return <h3>No image captured.</h3>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Captured Photo</h2>

      <img src={image} alt="Captured" width="300" />

      <br />

      <button
        style={styles.button}
        onClick={() => navigate(-1)}
      >
        Retake Photo
      </button>

      <button
        style={{ ...styles.button, marginLeft: "10px", backgroundColor: "black" }}
        onClick={() => navigate("/list")}
      >
        Back to List
      </button>
    </div>
  );
};

const styles = {
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

export default PhotoResult;