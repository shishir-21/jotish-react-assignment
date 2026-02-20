import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.nav}>
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/list")}>
        Jotish Employee Dashboard
      </h3>
    </div>
  );
};

const styles = {
  nav: {
    padding: "15px",
    backgroundColor: "#1976d2",
    color: "white",
  },
};

export default Navbar;