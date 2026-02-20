import { useLocation, useNavigate } from "react-router-dom";

const PhotoResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Captured image received from Details page
    const image = location.state;

    // If user refreshes page and no image is found
    if (!image) {
        return <h3>No image captured.</h3>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Captured Photo</h2>

                <img
                    src={image}
                    alt="Captured"
                    style={styles.image}
                />

                <div style={{ marginTop: "20px" }}>
                    {/* Retake Photo */}
                    <button
                        style={styles.primaryButton}
                        onClick={() => navigate(-1)}
                    >
                        Retake Photo
                    </button>

                    {/* Back to List */}
                    <button
                        style={styles.secondaryButton}
                        onClick={() => navigate("/list")}
                    >
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    );
};

// Styles must be defined OUTSIDE the component return
const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
    },
    card: {
        padding: "30px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    image: {
        width: "350px",
        borderRadius: "10px",
    },
    primaryButton: {
        padding: "8px 15px",
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginRight: "10px",
    },
    secondaryButton: {
        padding: "8px 15px",
        backgroundColor: "black",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
};

export default PhotoResult;