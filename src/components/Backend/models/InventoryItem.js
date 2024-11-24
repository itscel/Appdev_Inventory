const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const InventoryItem = sequelize.define('InventoryItem', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  stock_level: { type: DataTypes.INTEGER, defaultValue: 0 },
  price: { type: DataTypes.DECIMAL, allowNull: false },
});
InventoryItem.afterUpdate(async (inventoryItem, options) => {
    if (inventoryItem.stock_level < 10) {
      // Trigger low stock notification (e.g., email or internal alert)
      console.log(`Low stock alert: ${inventoryItem.name}`);
    }
  });
  

module.exports = InventoryItem;
