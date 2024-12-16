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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    backgroundColor: "#E7DBEF",
    color: "#49225B",
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "1.1em",
    borderBottom: "2px solid #ddd",
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
          <li
            key={index}
            style={{ marginBottom: "10px", textAlign: "center" }}
          >
            <a
              href={link.path}
              style={{ color: "#6E3482", textDecoration: "none" }}
            >
              <i className={`bi ${link.icon}`} style={{ marginRight: "10px" }}></i>
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

// Main Item Component
const Item = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]); // Placeholder for items list
  const [search, setSearch] = useState(""); // For search functionality
  const [sortBy, setSortBy] = useState("Name"); // For sort functionality
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const addItem = (item) => {
    setItems([...items, item]);
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort items based on selected criteria
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "Name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Quantity") {
      return a.quantity - b.quantity;
    } else if (sortBy === "Updated At") {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    } else if (sortBy === "Value") {
      return a.price * a.quantity - b.price * b.quantity;
    }
    return 0;
  });

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
          <button style={styles.button} onClick={() => setIsModalOpen(true)}>
            Add Item
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
            placeholder="Search Items"
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
              <option value="Quantity">Quantity</option>
              <option value="Updated At">Updated At</option>
              <option value="Value">Value</option>
            </select>
          </div>
        </div>

        {/* Items Table or Empty State */}
        {sortedItems.length === 0 ? (
          // Empty state rendering
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
                style={styles.button}
                onClick={() => setIsModalOpen(true)}
              >
                Add Item
              </button>
            </div>
          </div>
        ) : (
          // Table rendering when items are present
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Quantity</th>
                <th style={styles.tableHeader}>Unit</th>
                <th style={styles.tableHeader}>Min. Level</th>
                <th style={styles.tableHeader}>Price</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((item, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{item.name}</td>
                  <td style={styles.tableCell}>{item.quantity}</td>
                  <td style={styles.tableCell}>{item.unit}</td>
                  <td style={styles.tableCell}>{item.minLevel}</td>
                  <td style={styles.tableCell}>₱{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Item Modal */}
      {isModalOpen && (
        <AddItemModal onClose={() => setIsModalOpen(false)} onSubmit={addItem} />
      )}
    </div>
  );
};

// Add Item Modal Component
const AddItemModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: 1,
    unit: "Unit",
    minLevel: "",
    price: "",
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
      <form
        onSubmit={handleSubmit}
        style={styles.modalContent}
      >
        <h2 style={styles.modalHeader}>Add Item</h2>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.modalInput}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          style={styles.modalInput}
          required
        />
        <input
          name="unit"
          placeholder="Unit"
          value={formData.unit}
          onChange={handleChange}
          style={styles.modalInput}
          required
        />
        <input
          name="minLevel"
          placeholder="Min. Level"
          value={formData.minLevel}
          onChange={handleChange}
          style={styles.modalInput}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={styles.modalInput}
          required
        />
        <div style={styles.modalButtonContainer}>
          <button type="submit" style={styles.button}>Submit</button>
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

export default Item;
