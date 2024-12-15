import React from "react";
import { Link } from "react-router-dom";

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
  main: {
    flex: 1,
    padding: "40px 20px",
  },
  header: {
    color: "#49225B",
    marginBottom: "30px",
    fontSize: "2.5em",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    flex: "1 1 300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "20px",
    height: "250px",
  },
  cardTitle: {
    fontSize: "1.2em",
    color: "#6E3482",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardValue: {
    fontSize: "1.2em",
    color: "#49225B",
  },
  linkItem: {
    textDecoration: "none",
    color: "#49225B",
  },
  linkIcon: {
    marginRight: "10px",
    fontSize: "1.5em",
    color: "#6E3482",
  },
  description: {
    fontSize: "14px",
    color: "#6E3482",
    marginTop: "10px",
  },
};

const Card = ({ title, icon, children }) => (
  <div style={styles.card}>
    <span style={styles.cardTitle}>
      <i className={`bi ${icon}`} style={styles.linkIcon}></i>
      {title}
    </span>
    {children}
  </div>
);

const Report = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        <h1 style={styles.header}>Reports</h1>

        {/* Report Content Section */}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
          <Card title="Account History" icon="bi-clock">
            <Link to="/activity-history" style={styles.linkItem}>
              <div style={styles.description}>
                Keep tabs on all users' changes to items, folders, tags, & more.
              </div>
            </Link>
          </Card>
          <Card title="Inventory Summary" icon="bi-box">
            <Link to="/activity-history" style={styles.linkItem}>
              <div style={styles.description}>
                Review your inventory’s quantity, value, & location at a glance.
              </div>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Report;
