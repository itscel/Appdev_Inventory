import React, { useState } from "react";
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
    padding: "20px",
    borderRadius: "10px",
    flex: "1 1 200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "10px",
  },
  cardTitle: {
    fontSize: "1em",
    color: "#6E3482",
    fontWeight: "bold",
  },
  cardValue: {
    fontSize: "1.2em",
    color: "#49225B",
  },
  dropdown: {
    position: "relative",
  },
  dropdownButton: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    border: "1px solid #6E3482",
    color: "#6E3482",
    cursor: "pointer",
    fontSize: "1em",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: "0",
    backgroundColor: "#fff",
    border: "1px solid #6E3482",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    width: "100%",
  },
  dropdownItem: {
    padding: "10px",
    width: "100%",
    backgroundColor: "#fff",
    border: "none",
    textAlign: "left",
    fontSize: "1em",
    color: "#6E3482",
    cursor: "pointer",
  },
};

// Reusable Card component
const Card = ({ title, value }) => (
  <div style={styles.card}>
    <span style={styles.cardTitle}>{title}</span>
    {value && <span style={styles.cardValue}>{value}</span>}
  </div>
);

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

// Reusable Dropdown component
const Dropdown = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div style={styles.dropdown}>
      <button onClick={toggleDropdown} style={styles.dropdownButton}>
        {selected} ▼
      </button>
      {isOpen && (
        <div style={styles.dropdownMenu}>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              style={styles.dropdownItem}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedActivity, setSelectedActivity] = useState("All Activity");
  const [stockLevelFilter, setStockLevelFilter] = useState("At or Below Min Level");

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <Sidebar onLogout={handleLogout} />
      <div style={styles.main}>
        <h1 style={styles.header}>Dashboard</h1>

        {/* Inventory Summary */}
        <div style={{ marginBottom: "20px" }}>
          <span style={{ fontSize: "1.5em", color: "#6E3482" }}>Inventory Summary</span>
        </div>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
          {[
            "Items",
            "Total Quantity",
            "Total Value",
          ].map((label, index) => (
            <Card key={index} title={label} value={(index + 1) * 100} />
          ))}
        </div>

        {/* Recent Activity */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "1.5em", color: "#49225B" }}>Recent Activity</span>
            <Dropdown
              label="Filter by"
              options={[
                "All Activity",
                "Moved",
                "Edited",
                "Deleted",
                "Created",
                "Restored",
                "Quantity Changed",
                "Merged",
              ]}
              selected={selectedActivity}
              onSelect={setSelectedActivity}
            />
          </div>
          <Card title="No recent activity. Check filters and try again." />
        </div>

        {/* Recent Items */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "1.5em", color: "#49225B" }}>Recent Items</span>
          </div>
          <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "20px" }}>
            <Card title="No items found." />
          </div>
        </div>

        {/* Stock Levels */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "1.5em", color: "#49225B" }}>Stock Levels (0 results)</span>
            <Dropdown
              label="Stock Levels"
              options={["At or Below Min Level", "With 0 Quantity", "Custom"]}
              selected={stockLevelFilter}
              onSelect={setStockLevelFilter}
            />
          </div>
          <Card title="No items found. Check filters and try again." />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
