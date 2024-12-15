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

const Item = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("Name");

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <Sidebar onLogout={handleLogout} />
      <div style={styles.main}>
        {/* Title and Add Item button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <h1 style={styles.header}>All Items</h1>
          <button
            style={{
              backgroundColor: "#49225B",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            Add Item
          </button>
        </div>

        {/* Filter section */}
        <div
          style={{
            backgroundColor: "#E7DBEF",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              type="text"
              placeholder="Search All Items"
              style={{ padding: "10px", borderRadius: "5px", width: "250px" }}
            />
            <div>
              <label htmlFor="sortBy" style={{ marginRight: "10px" }}>
                Sort by
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleSortChange}
                style={{ padding: "10px", borderRadius: "5px" }}
              >
                <option value="Name">Name</option>
                <option value="Quantity">Quantity</option>
                <option value="Updated At">Updated At</option>
                <option value="Value">Value</option>
              </select>
            </div>
          </div>
        </div>

        {/* Placeholder for Items List */}
        <div style={{ padding: "20px" }}>
          <div style={{ display: "flex", gap: "40px" }}>
            <div>
              <span style={{ color: "#49225B", fontWeight: "bold" }}>
                Folders:
              </span>{" "}
              0
            </div>
            <div>
              <span style={{ color: "#49225B", fontWeight: "bold" }}>
                Items:
              </span>{" "}
              0
            </div>
            <div>
              <span style={{ color: "#49225B", fontWeight: "bold" }}>
                Total Quantity:
              </span>{" "}
              0 units
            </div>
            <div>
              <span style={{ color: "#49225B", fontWeight: "bold" }}>
                Total Value:
              </span>{" "}
              ₱0.00
            </div>
          </div>
        </div>

        {/* Placeholder for Empty Catalog */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <svg
              width="156"
              height="164"
              viewBox="0 0 156 164"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFFFFF"
                d="M149.1 70.2002C171.7 111.1 133 150.1 110.2 158.4C95 164 77 164.5 61.1 161.5C48.5 159.1 36.4 154 26.6 146.2C9.10001 132.2 -6.9 93.8002 4.9 64.1002C18.3 30.3002 117.3 12.8002 149.1 70.2002Z"
              />
            </svg>
            <p style={{ color: "#49225B", fontWeight: "bold" }}>
              This place is feeling a bit lonely. Let's jazz it up with some
              inventory
            </p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#49225B",
                color: "#fff",
                borderRadius: "5px",
              }}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
