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
  tableCell: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
  },
  button: {
    backgroundColor: "#49225B",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    width: "250px",
  },
  sortSelect: {
    padding: "10px",
    borderRadius: "5px",
    marginLeft: "10px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  },
  modalHeader: {
    color: "#49225B",
    marginBottom: "20px",
    fontSize: "1.8em",
    fontWeight: "bold",
  },
  modalInput: {
    padding: "10px",
    borderRadius: "5px",
    width: "100%",
    marginBottom: "15px",
    border: "1px solid #ddd",
  },
  modalButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
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
        <img
          src="https://via.placeholder.com/60"
          alt="App Logo"
          style={{ width: "60px" }}
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map((link, index) => (
          <li key={index} style={{ marginBottom: "10px", textAlign: "center" }}>
            <a
              href={link.path}
              style={{ color: "#6E3482", textDecoration: "none" }}
            >
              <i
                className={`bi ${link.icon}`}
                style={{ marginRight: "10px" }}
              ></i>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={onLogout}
        style={{
          ...styles.button,
          marginTop: "20px",
          width: "100%",
        }}
      >
        Logout
      </button>
    </div>
  );
};

// Main Supplier Component
const Supplier = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]); // Placeholder for suppliers list
  const [search, setSearch] = useState(""); // For search functionality
  const [sortBy, setSortBy] = useState("Name"); // For sort functionality
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const addSupplier = (supplier) => {
    setSuppliers([...suppliers, supplier]);
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort suppliers based on selected criteria
  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    if (sortBy === "Name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Contact") {
      return a.contact.localeCompare(b.contact);
    } else if (sortBy === "Location") {
      return a.location.localeCompare(b.location);
    }
    return 0;
  });

  return (
    <div style={styles.container}>
      <Sidebar onLogout={handleLogout} />
      <div style={styles.main}>
        {/* Title and Add Supplier button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <h1 style={styles.header}>All Suppliers</h1>
          <button style={styles.button} onClick={() => setIsModalOpen(true)}>
            Add Supplier
          </button>
        </div>

        {/* Search and Sort Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            padding: "20px",
            backgroundColor: "#E7DBEF",
            borderRadius: "8px",
          }}
        >
          <input
            type="text"
            placeholder="Search Suppliers"
            value={search}
            onChange={handleSearchChange}
            style={styles.input}
          />
          <div>
            <label htmlFor="sortBy" style={{ marginRight: "10px" }}>
              Sort by
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={handleSortChange}
              style={styles.sortSelect}
            >
              <option value="Name">Name</option>
              <option value="Contact">Contact</option>
              <option value="Location">Location</option>
            </select>
          </div>
        </div>

        {/* Suppliers Table or Empty State */}
        {sortedSuppliers.length === 0 ? (
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
                No suppliers found. Let's add some.
              </p>
              <button
                style={styles.button}
                onClick={() => setIsModalOpen(true)}
              >
                Add Supplier
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>Name</th>
                  <th style={styles.tableHeader}>Contact</th>
                  <th style={styles.tableHeader}>Location</th>
                  <th style={styles.tableHeader}>Email</th>
                </tr>
              </thead>
              <tbody style={styles.tableBody}>
                {sortedSuppliers.map((supplier, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{supplier.name}</td>
                    <td style={styles.tableCell}>{supplier.contact}</td>
                    <td style={styles.tableCell}>{supplier.location}</td>
                    <td style={styles.tableCell}>{supplier.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Supplier Modal */}
      {isModalOpen && (
        <AddSupplierModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={addSupplier}
        />
      )}
    </div>
  );
};

// Add Supplier Modal Component
const AddSupplierModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={styles.modalOverlay}>
      <form onSubmit={handleSubmit} style={styles.modalContent}>
        <h2 style={styles.modalHeader}>Add Supplier</h2>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.modalInput}
          required
        />
        <input
          name="contact"
          placeholder="Contact"
          value={formData.contact}
          onChange={handleChange}
          style={styles.modalInput}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          style={styles.modalInput}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.modalInput}
          required
        />
        <div style={styles.modalButtonContainer}>
          <button type="submit" style={styles.button}>
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ ...styles.button, backgroundColor: "#ddd" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Supplier;
