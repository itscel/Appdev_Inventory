import React, { useState } from "react";
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
  const [filters, setFilters] = useState({
    action: "",
    sortBy: "newest",
    dateRange: "today",
    fromDate: "",
    toDate: "",
  });

  const [activityData, setActivityData] = useState([]); // Assuming you will fetch data

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({
      action: "",
      sortBy: "newest",
      dateRange: "today",
      fromDate: "",
      toDate: "",
    });
  };

  const fetchActivityData = async () => {
    // Assuming you have an API endpoint to fetch the data
    // Replace with actual fetch logic
    const data = [
      { date: "2024-12-10", activityType: "Created", activity: "Item Added", username: "user1", sid: "123", item: "Item A", qtyChange: "10", qtyBalance: "100", qtyMoved: "0" },
      { date: "2024-12-11", activityType: "Edited", activity: "Item Edited", username: "user2", sid: "124", item: "Item B", qtyChange: "-5", qtyBalance: "95", qtyMoved: "0" },
    ];
    setActivityData(data);
  };

  React.useEffect(() => {
    fetchActivityData();
  }, []);

  return (
    <div style={styles.container}>
      <Sidebar onLogout={() => console.log('Logging out...')} />
      <div style={styles.activityContent}>
        <h1 style={styles.header}>Activity History</h1>

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

        {/* Filters */}
        <div style={styles.filtersContainer}>
          <div style={styles.filterSection}>
            <div style={styles.filterTitle}>Filter by actions</div>
            <select
              name="action"
              value={filters.action}
              onChange={handleFilterChange}
              style={styles.select}
            >
              <option value="">Select Action</option>
              <option value="moved">Moved</option>
              <option value="edited">Edited</option>
              <option value="deleted">Deleted</option>
              <option value="created">Created</option>
              <option value="restored">Restored</option>
              <option value="quantityChanged">Quantity Changed</option>
              <option value="merged">Merged</option>
            </select>
          </div>

          <div style={styles.filterSection}>
            <div style={styles.filterTitle}>Sort By</div>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              style={styles.select}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <div style={styles.filterSection}>
            <div style={styles.filterTitle}>Date</div>
            <select
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              style={styles.select}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="thisWeek">This Week</option>
              <option value="lastWeek">Last Week</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="last3Months">Last 3 Months</option>
              <option value="lastYear">Last Year</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {filters.dateRange === "custom" && (
            <div style={styles.customDateContainer}>
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleDateChange}
                style={styles.dateInput}
              />
              <span style={styles.toText}>to</span>
              <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={handleDateChange}
                style={styles.dateInput}
              />
            </div>
          )}

          <div style={styles.actionsContainer}>
            <button style={styles.applyButton}>Apply</button>
            <button onClick={resetFilters} style={styles.cancelButton}>
              Reset
            </button>
          </div>
        </div>

        {/* Activity Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Activity Type</th>
                <th style={styles.tableHeader}>Activity</th>
                <th style={styles.tableHeader}>Username</th>
                <th style={styles.tableHeader}>SID</th>
                <th style={styles.tableHeader}>Item</th>
                <th style={styles.tableHeader}>Qty Change</th>
                <th style={styles.tableHeader}>Qty Balance</th>
                <th style={styles.tableHeader}>Qty Moved</th>
              </tr>
            </thead>
            <tbody style={styles.tableBody}>
              {activityData.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.date}</td>
                  <td>{activity.activityType}</td>
                  <td>{activity.activity}</td>
                  <td>{activity.username}</td>
                  <td>{activity.sid}</td>
                  <td>{activity.item}</td>
                  <td>{activity.qtyChange}</td>
                  <td>{activity.qtyBalance}</td>
                  <td>{activity.qtyMoved}</td>
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
    fontWeight: "bold", // Added this line to make the header bold
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
  filtersContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "30px",
  },
  filterSection: {
    flex: "1 1 300px",
  },
  filterTitle: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  customDateContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  dateInput: {
    padding: "10px",
    width: "150px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  toText: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  actionsContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px",
  },
  applyButton: {
    backgroundColor: "#49225B",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#ddd",
    color: "#49225B",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
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
