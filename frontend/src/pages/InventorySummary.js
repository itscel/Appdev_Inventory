import React, { useState, useEffect } from "react";
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
        <img
          src="https://via.placeholder.com/60"
          alt="App Logo"
          style={{ width: "60px" }}
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map((link, index) => (
          <li key={index} style={{ marginBottom: "10px", textAlign: "center" }}>
            <Link
              to={link.path}
              style={{
                color: "#6E3482",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className={`bi ${link.icon}`} style={{ marginRight: "10px" }}></i>
              {link.label}
            </Link>
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

// ActivityHistory Component
const ActivityHistory = () => {
  const [activityData, setActivityData] = useState([]);

  // Fetch activity data
  const fetchActivityData = async () => {
    const data = [
      { name: "Item A", quantity: "10", minLevel: "5", price: "₱100", value: "₱1000", tags: "tag1", notes: "First batch" },
      { name: "Item B", quantity: "5", minLevel: "3", price: "₱120", value: "₱600", tags: "tag2", notes: "Second batch" },
    ];
    setActivityData(data);
  };

  useEffect(() => {
    fetchActivityData();
  }, []);

  const totalQuantity = activityData.reduce((acc, curr) => acc + parseInt(curr.quantity), 0);
  const totalValue = activityData.reduce((acc, curr) => acc + parseFloat(curr.value.replace("₱", "")), 0).toFixed(2);

  return (
    <div style={styles.container}>
      <Sidebar onLogout={() => console.log('Logging out...')} />
      <div style={styles.activityContent}>
        <h1 style={styles.header}>Inventory Summary</h1>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search activity..."
            style={styles.searchInput}
          />
          <button style={styles.searchButton} aria-label="Search">
            <i className="bi-search"></i>
          </button>
        </div>

        {/* Total Quantity and Total Value - Separate Boxes */}
        <div style={styles.totalSummary}>
          <div style={styles.summaryBox}>
            <p style={styles.summaryText}>Total Quantity:</p>
            <p style={styles.summaryValue}>{totalQuantity} units</p>
          </div>
          <div style={styles.summaryBox}>
            <p style={styles.summaryText}>Total Value:</p>
            <p style={styles.summaryValue}>₱{totalValue}</p>
          </div>
        </div>

        {/* Activity Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Quantity</th>
                <th style={styles.tableHeader}>Min Level</th>
                <th style={styles.tableHeader}>Price</th>
                <th style={styles.tableHeader}>Value</th>
                <th style={styles.tableHeader}>Tags</th>
                <th style={styles.tableHeader}>Notes</th>
              </tr>
            </thead>
            <tbody style={styles.tableBody}>
              {activityData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.minLevel}</td>
                  <td>{item.price}</td>
                  <td>{item.value}</td>
                  <td>{item.tags}</td>
                  <td>{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    boxShadow: "4px 0 8px rgba(0, 0, 0, 0.1)",
  },
  activityContent: {
    marginLeft: "200px",
    padding: "20px",
    width: "calc(100% - 200px)",
    backgroundColor: "rgb(245, 235, 250)",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    color: "#49225B",
    marginBottom: "30px",
    fontSize: "2.5em",
    fontWeight: "bold",
  },
  searchContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    width: "300px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    marginRight: "10px",
  },
  searchButton: {
    padding: "10px",
    backgroundColor: "#49225B",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  totalSummary: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  summaryBox: {
    padding: "20px",
    width: "48%", // To make sure the boxes stay side by side
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  summaryText: {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  summaryValue: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  tableContainer: {
    overflowX: "auto",
    marginTop: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeaderRow: {
    backgroundColor: "#49225B",
    color: "#fff",
  },
  tableHeader: {
    padding: "12px",
    textAlign: "center",
    fontWeight: "bold",
  },
  tableBody: {
    backgroundColor: "#F9F9F9",
  },
};

export default ActivityHistory;
