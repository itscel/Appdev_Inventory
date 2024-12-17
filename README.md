Here is the updated version of the **LCM Inventory App** documentation with the member names included:

---

# LCM Inventory App

## Overview

**LCM Inventory** is a simple inventory management application designed to help users efficiently track and manage their inventory. Built with modern technologies such as React, Node.js, Express, and MongoDB, this app provides an intuitive interface for adding, updating, and removing inventory items. It also includes visual data representation through charts.

## Features
- **Add/Remove/Update Inventory**: Manage your inventory with ease.
- **Real-Time Data**: Reflect changes in real-time.
- **Data Visualization**: View data through interactive charts and graphs.
- **Responsive UI**: A responsive user interface built using React.

## Technologies Used
- **MongoDB**: A NoSQL database for storing inventory data.
- **React**: A JavaScript library for building the user interface.
- **Node.js**: JavaScript runtime used to run the server.
- **Express**: Web application framework for Node.js, used for API development.

## Installation and Setup

To get started with the LCM Inventory app locally, follow the steps below:

### 1. Clone the Repository

Clone the repository to your local machine using Git:
```bash
git clone https://github.com/itscel/Appdev_Inventory.git
```

### 2. Delete the `.env` File (if present)

If your project has an existing `.env` file, you may need to delete it. This step ensures there are no outdated or unwanted environment variables before proceeding with the setup.

### 3. Set Up Environment Variables

Run the following command to set up your environment variables:
```bash
npm run setup-env
```

This command ensures that all necessary environment configurations are in place. If you don’t already have a `.env` file, create one and define the required variables (e.g., MongoDB connection string).

### 4. Install Development Dependencies

To run both the frontend and backend concurrently, you need to install `concurrently`. This package helps in managing multiple npm scripts simultaneously. Run:
```bash
npm install concurrently --save-dev
```

### 5. Install Required Frontend Packages

To install additional UI and charting libraries, run the following commands:

- For Bootstrap Icons:
  ```bash
  npm install bootstrap-icons
  ```

- For React Chart.js integration:
  ```bash
  npm install react-chartjs-2 chart.js
  ```

### 6. Start the Application

Once you have all dependencies installed, start both the backend and frontend servers by running:
```bash
npm run start
```
This will launch the application on your local machine. You should now be able to access the app through your browser.

## Usage

Once the app is up and running:
1. Navigate to the frontend to interact with the inventory.
2. Use the backend API to manage the data, or interact with the frontend for a seamless experience.
3. Explore the charts to visualize the inventory data in a graphical format.

## Members

This project was developed by:
- **Dramayo, Llewelyn**
- **Heyrosa, Ceril**
- **Navarro, Mark Angelo**

## Contributing

We welcome contributions! If you’d like to contribute to the LCM Inventory App:
1. Fork the repository.
2. Make changes in a feature branch.
3. Submit a pull request for review.

Make sure to follow the project’s code style and ensure all tests pass before submitting your pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Let me know if you need any more updates or changes to the documentation!
