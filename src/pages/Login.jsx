import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State to store username input
  const [username, setUsername] = useState("");

  // State to store password input
  const [password, setPassword] = useState("");

  // State to store error message
  const [error, setError] = useState("");

  // Hook used for navigation between routes
  const navigate = useNavigate();

  // Function to handle login submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload

    // Validate credentials as per assignment requirement
    if (username === "test" && password === "123456") {
      setError("");

      // Store authentication flag in localStorage
      localStorage.setItem("isAuthenticated", "true");

      // Redirect to List page after successful login
      navigate("/list");
    } else {
      // Show error if credentials are incorrect
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {/* Error Message Display */}
          {error && <p style={styles.error}>{error}</p>}

          {/* Submit Button */}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// Inline styling for simplicity
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
    width: "300px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "white",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default Login;