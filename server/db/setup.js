const { sequelize } = require('./connection');

async function setupDatabase() {
  try {
    // Sync all models with the database
    await sequelize.sync({ alter: true });
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

// Run the setup function
setupDatabase();

module.exports = setupDatabase; 