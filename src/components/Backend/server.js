const sequelize = require("./db");

sequelize.sync({ force: false }).then(() => {
  console.log("Database synced!");
});
