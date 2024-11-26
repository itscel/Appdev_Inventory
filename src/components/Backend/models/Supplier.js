const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Supplier = sequelize.define('Supplier', {
  name: { type: DataTypes.STRING, allowNull: false },
  contact_info: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Supplier;
