// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,  // Full name is required
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Enforcing unique email addresses
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,  // Password is required
    }
  });

  return User;
};
