import React from 'react';
import { Card } from '../App';

interface CardsListProps {
  cards: Card[];
}

const CardsList: React.FC<CardsListProps> = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <div className="no-cards">
        <p>No cards in this list yet.</p>
      </div>
    );
  }

  return (
    <div className="cards-container">
      {cards.map((card) => (
        <div key={card.id} className="card">
          <h3>{card.word}</h3>
          <p>{card.definition}</p>
        </div>
      ))}
    </div>
  );
};

export default CardsList; 