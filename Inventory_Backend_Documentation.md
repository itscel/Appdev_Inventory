
# Inventory Management System - Backend Documentation

## 1. Prerequisites
- **Node.js**: Ensure Node.js (v18 or above) is installed. Check with `node -v`.
- **MySQL**: A running MySQL database server.
- **Package Manager**: Use `npm` (bundled with Node.js).
- **Text Editor/IDE**: Recommended: Visual Studio Code.

## 2. Backend Overview
The backend is built using:
- **Express.js**: For RESTful API routing.
- **Sequelize ORM**: For database interactions with MySQL.
- **bcrypt**: For password hashing.
- **jsonwebtoken**: For user authentication.
- **dotenv**: To manage environment variables.

## 3. File Structure
```
src/
├── components/
│   ├── backend/
│   │   ├── models/        # Sequelize models (User, Inventory, Supplier)
│   │   ├── routes/        # routes (authRoutes, inventoryRoutes, supplierRoutes)
│   │   ├── db.js          # Database connection configuration
│   │   ├── server.js      # Main entry point for backend
│   │   ├── .env           # Environment variables
```

## 4. Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd your-repo-name/src/components/backend
   ```

2. Install dependencies:
   ```bash
   npm install express sequelize mysql2 bcrypt jsonwebtoken dotenv
   ```

## 5. Database Setup
1. Create a `.env` file in the `backend` folder with the following content:
   ```env
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=your_user
   DB_PASS=your_password
   DB_NAME=inventory_db
   JWT_SECRET=your_secret_key
   ```

2. Set up the database:
   - Log in to MySQL and create the database:
     ```sql
     CREATE DATABASE inventory_db;
     ```

3. Sequelize will auto-sync models to create necessary tables on server start.

## 6. Running the Backend
1. Start the server:
   ```bash
   node server.js
   ```

2. The backend will run on `http://localhost:5000` by default.

## 7. API Routes
| **Route**                  | **Method** | **Description**                        |
|----------------------------|------------|----------------------------------------|
| `/auth/register`           | POST       | Register a new user.                   |
| `/auth/login`              | POST       | Login and receive a JWT.               |
| `/inventory`               | GET        | Fetch all inventory items.             |
| `/inventory`               | POST       | Add a new inventory item.              |
| `/inventory/:id`           | PUT        | Update inventory item details.         |
| `/inventory/:id`           | DELETE     | Delete an inventory item.              |
| `/suppliers`               | GET        | Fetch all suppliers.                   |
| `/suppliers`               | POST       | Add a new supplier.                    |

## 8. Testing and Debugging
- **Postman/Insomnia**: Test API endpoints.
- **Logging**: Use `console.log()` or tools like `morgan`.
- **Database Verification**: Check MySQL tables for changes.

## Additional Notes
- Ensure the `.env` file is not committed to the repository.
- Use `npm start` if you have added it as a script in `package.json`.
