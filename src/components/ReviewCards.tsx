import React from 'react';
import { Card } from '../App';

interface ReviewCardsProps {
  unknownCards: Card[];
  knownCards: Card[];
  onKnownCard: (card: Card) => void;
  onUnknownCard: (card: Card) => void;
  onEndReview: () => void;
}

const ReviewCards: React.FC<ReviewCardsProps> = ({
  unknownCards,
  knownCards,
  onKnownCard,
  onUnknownCard,
  onEndReview
}) => {
  const currentCard = unknownCards[0];

  if (!currentCard && unknownCards.length === 0) {
    return (
      <div className="review-container">
        <h2>Review Complete!</h2>
        <p>You've reviewed all cards.</p>
        
        <div className="lists-container">
          <div className="list">
            <h2>Known Words ({knownCards.length})</h2>
            {knownCards.map((card) => (
              <div key={card.id} className="list-item">
                <strong>{card.word}</strong>: {card.definition}
              </div>
            ))}
          </div>
          
          {unknownCards.length > 0 && (
            <div className="list">
              <h2>Words to Review ({unknownCards.length})</h2>
              {unknownCards.map((card) => (
                <div key={card.id} className="list-item">
                  <strong>{card.word}</strong>: {card.definition}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button className="button" onClick={onEndReview} style={{ marginTop: '2rem' }}>
          Back to Cards
        </button>
      </div>
    );
  }

  return (
    <div className="review-container">
      <div className="review-card">
        <h2>{currentCard.word}</h2>
        <p>{currentCard.definition}</p>
      </div>
      
      <div className="review-buttons">
        <button 
          className="button know-button" 
          onClick={() => onKnownCard(currentCard)}
        >
          I Know This
        </button>
        <button 
          className="button dont-know-button" 
          onClick={() => onUnknownCard(currentCard)}
        >
          Don't Know Yet
        </button>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <p>Progress: {knownCards.length} known, {unknownCards.length} to review</p>
      </div>
      
      <button 
        className="button" 
        onClick={onEndReview} 
        style={{ marginTop: '2rem' }}
      >
        End Review
      </button>
    </div>
  );
};

export default ReviewCards; 