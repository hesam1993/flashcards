require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, Card, KnownCard, UnknownCard } = require('./db/connection');

const app = express();
const PORT = 5001;

// Middleware
// Configure CORS properly with wildcard
app.use(cors({
  origin: '*', // Allow all origins temporarily for debugging
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add OPTIONS handling for preflight requests
app.options('*', cors());

app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Sync the database
sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Failed to sync database:', err);
});

// API Routes

// Get all cards
app.get('/api/cards', async (req, res) => {
  try {
    const cards = await Card.findAll({
      order: [['createdAt', 'DESC']]
    });
    console.log(`Returning ${cards.length} cards`);
    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// Get known cards
app.get('/api/cards/known', async (req, res) => {
  try {
    // Simplified query for debugging
    const knownIds = await KnownCard.findAll();
    const cardIds = knownIds.map(k => k.card_id);
    
    if (cardIds.length === 0) {
      return res.json([]);
    }
    
    const knownCards = await Card.findAll({
      where: {
        id: cardIds
      },
      order: [['createdAt', 'DESC']]
    });
    console.log(`Returning ${knownCards.length} known cards`);
    res.json(knownCards);
  } catch (error) {
    console.error('Error fetching known cards:', error);
    res.status(500).json({ error: 'Failed to fetch known cards' });
  }
});

// Get unknown cards
app.get('/api/cards/unknown', async (req, res) => {
  try {
    // Simplified query for debugging
    const unknownIds = await UnknownCard.findAll();
    const cardIds = unknownIds.map(k => k.card_id);
    
    if (cardIds.length === 0) {
      return res.json([]);
    }
    
    const unknownCards = await Card.findAll({
      where: {
        id: cardIds
      },
      order: [['createdAt', 'DESC']]
    });
    console.log(`Returning ${unknownCards.length} unknown cards`);
    res.json(unknownCards);
  } catch (error) {
    console.error('Error fetching unknown cards:', error);
    res.status(500).json({ error: 'Failed to fetch unknown cards' });
  }
});

// Add a new card
app.post('/api/cards', async (req, res) => {
  const { id, word, definition } = req.body;
  
  if (!id || !word || !definition) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    await Card.create({
      id,
      word,
      definition
    });
    res.status(201).json({ message: 'Card added successfully' });
  } catch (error) {
    console.error('Error adding card:', error);
    res.status(500).json({ error: 'Failed to add card' });
  }
});

// Mark a card as known
app.post('/api/cards/known', async (req, res) => {
  const { cardId } = req.body;
  
  if (!cardId) {
    return res.status(400).json({ error: 'Card ID is required' });
  }
  
  try {
    // Remove from unknown if it's there
    await UnknownCard.destroy({
      where: { card_id: cardId }
    });
    
    // Add to known if not already there
    await KnownCard.findOrCreate({
      where: { card_id: cardId }
    });
    
    res.json({ message: 'Card marked as known' });
  } catch (error) {
    console.error('Error marking card as known:', error);
    res.status(500).json({ error: 'Failed to mark card as known' });
  }
});

// Mark a card as unknown
app.post('/api/cards/unknown', async (req, res) => {
  const { cardId } = req.body;
  
  if (!cardId) {
    return res.status(400).json({ error: 'Card ID is required' });
  }
  
  try {
    // Add to unknown if not already there
    await UnknownCard.findOrCreate({
      where: { card_id: cardId }
    });
    
    res.json({ message: 'Card marked as unknown' });
  } catch (error) {
    console.error('Error marking card as unknown:', error);
    res.status(500).json({ error: 'Failed to mark card as unknown' });
  }
});

// Delete a card
app.delete('/api/cards/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await Card.destroy({
      where: { id }
    });
    res.json({ message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 