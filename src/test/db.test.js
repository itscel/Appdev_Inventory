const { sequelize } = require('../components/Backendbackend/db');  // Import the Sequelize instance
const { expect } = require('chai');

describe('Database Connection', () => {
  it('should connect to the database successfully', async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully!');
      expect(true).to.be.true;
    } catch (error) {
      console.error('Database connection failed:', error);
      expect(false).to.be.true;
    }
  });
});
