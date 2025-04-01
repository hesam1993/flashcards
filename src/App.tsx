import React, { useState, useEffect } from 'react';
import CardForm from './components/CardForm';
import CardsList from './components/CardsList';
import ReviewCards from './components/ReviewCards';
import { 
  fetchCards, 
  fetchKnownCards, 
  fetchUnknownCards, 
  addCard as apiAddCard, 
  markCardAsKnown, 
  markCardAsUnknown 
} from './services/api';

// Define the Card type
export type Card = {
  id: string;
  word: string;
  definition: string;
};

const App: React.FC = () => {
  // States for the application
  const [cards, setCards] = useState<Card[]>([]);
  const [knownCards, setKnownCards] = useState<Card[]>([]);
  const [unknownCards, setUnknownCards] = useState<Card[]>([]);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load cards from the database when the app starts
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [allCards, known, unknown] = await Promise.all([
          fetchCards(),
          fetchKnownCards(),
          fetchUnknownCards()
        ]);
        
        setCards(allCards);
        setKnownCards(known);
        setUnknownCards(unknown);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load cards. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Add a new card
  const addCard = async (newCard: Card) => {
    try {
      const success = await apiAddCard(newCard);
      if (success) {
        setCards([newCard, ...cards]);
      } else {
        setError('Failed to add card. Please try again.');
      }
    } catch (err) {
      console.error('Error adding card:', err);
      setError('Failed to add card. Please try again.');
    }
  };

  // Start the review process
  const startReview = () => {
    // Start review with all cards that aren't already in known cards
    const cardsToReview = cards.filter(
      card => !knownCards.some(knownCard => knownCard.id === card.id)
    );
    setUnknownCards(cardsToReview);
    setIsReviewing(true);
  };

  // Handle when a user knows a card
  const handleKnownCard = async (card: Card) => {
    try {
      const success = await markCardAsKnown(card.id);
      if (success) {
        // Only add to known cards if it's not already there
        if (!knownCards.some(knownCard => knownCard.id === card.id)) {
          setKnownCards([...knownCards, card]);
        }
        setUnknownCards(unknownCards.filter(c => c.id !== card.id));
      } else {
        setError('Failed to mark card as known. Please try again.');
      }
    } catch (err) {
      console.error('Error marking card as known:', err);
      setError('Failed to mark card as known. Please try again.');
    }
  };

  // Handle when a user doesn't know a card
  const handleUnknownCard = async (card: Card) => {
    try {
      const success = await markCardAsUnknown(card.id);
      if (success) {
        // Move the card to the end of the unknown list
        setUnknownCards([
          ...unknownCards.filter(c => c.id !== card.id),
          card
        ]);
      } else {
        setError('Failed to mark card as unknown. Please try again.');
      }
    } catch (err) {
      console.error('Error marking card as unknown:', err);
      setError('Failed to mark card as unknown. Please try again.');
    }
  };

  // End the review process
  const endReview = () => {
    setIsReviewing(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Flash Cards</h1>
        <p>Learn new words effectively</p>
      </header>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {isLoading ? (
        <div className="loading">
          <p>Loading cards...</p>
        </div>
      ) : !isReviewing ? (
        <>
          <CardForm onAddCard={addCard} />
          
          {cards.length > 0 && (
            <div className="review-button-container">
              <button className="button button-secondary" onClick={startReview}>
                Start Review
              </button>
            </div>
          )}
          
          <div className="lists-container">
            <div className="list">
              <h2>All Words ({cards.length})</h2>
              <CardsList cards={cards} />
            </div>
            
            {knownCards.length > 0 && (
              <div className="list">
                <h2>Known Words ({knownCards.length})</h2>
                <CardsList cards={knownCards} />
              </div>
            )}
            
            {unknownCards.length > 0 && !isReviewing && (
              <div className="list">
                <h2>Words to Review ({unknownCards.length})</h2>
                <CardsList cards={unknownCards} />
              </div>
            )}
          </div>
        </>
      ) : (
        <ReviewCards 
          unknownCards={unknownCards} 
          onKnownCard={handleKnownCard}
          onUnknownCard={handleUnknownCard}
          onEndReview={endReview}
          knownCards={knownCards}
        />
      )}
    </div>
  );
};

export default App; 