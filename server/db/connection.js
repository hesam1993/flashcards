const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Create a SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'flashcards.sqlite'),
  logging: false
});

// Define models
const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false
  },
  definition: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

const KnownCard = sequelize.define('KnownCard', {
  card_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    references: {
      model: Card,
      key: 'id'
    }
  }
});

const UnknownCard = sequelize.define('UnknownCard', {
  card_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    references: {
      model: Card,
      key: 'id'
    }
  }
});

// Set up associations
Card.hasOne(KnownCard, { foreignKey: 'card_id', onDelete: 'CASCADE' });
KnownCard.belongsTo(Card, { foreignKey: 'card_id' });

Card.hasOne(UnknownCard, { foreignKey: 'card_id', onDelete: 'CASCADE' });
UnknownCard.belongsTo(Card, { foreignKey: 'card_id' });

module.exports = {
  sequelize,
  Card,
  KnownCard,
  UnknownCard
}; 