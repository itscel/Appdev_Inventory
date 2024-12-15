import React from "react";
import { useNavigate } from "react-router-dom";

// Reusable styles
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F5EBFA",
  },
  sidebar: {
    width: "200px",
    backgroundColor: "#E7DBEF",
    padding: "20px",
  },
};

// Reusable Sidebar component
const Sidebar = ({ onLogout }) => {
  const links = [
    { label: "Dashboard", path: "/dashboard", icon: "bi-house-door" },
    { label: "Items", path: "/item", icon: "bi-box" },
    { label: "Reports", path: "/report", icon: "bi-file-earmark-text" },
    { label: "Suppliers", path: "/supplier", icon: "bi-person" },
  ];

  return (
    <div style={styles.sidebar}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src="https://via.placeholder.com/60" alt="App Logo" style={{ width: "60px" }} />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map((link, index) => (
          <li key={index} style={{ marginBottom: "10px", textAlign: "center" }}>
            <a href={link.path} style={{ color: "#6E3482", textDecoration: "none" }}>
              <i className={`bi ${link.icon}`} style={{ marginRight: "10px" }}></i>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={onLogout}
        style={{
          backgroundColor: "#49225B",
          color: "#fff",
          width: "100%",
          padding: "10px 20px",
          borderRadius: "5px",
          marginTop: "20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

const Supplier = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <Sidebar onLogout={handleLogout} />
    </div>
  );
};

export default Supplier;

