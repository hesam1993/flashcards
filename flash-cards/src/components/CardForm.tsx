import React, { useState } from 'react';
import { Card } from '../App';

interface CardFormProps {
  onAddCard: (card: Card) => void;
}

const CardForm: React.FC<CardFormProps> = ({ onAddCard }) => {
  const [word, setWord] = useState<string>('');
  const [definition, setDefinition] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (word.trim() && definition.trim()) {
      const newCard: Card = {
        id: Date.now().toString(),
        word: word.trim(),
        definition: definition.trim()
      };
      
      onAddCard(newCard);
      
      // Reset form
      setWord('');
      setDefinition('');
    }
  };

  return (
    <div className="card-form">
      <h2>Add New Word</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="word">Word</label>
          <input
            type="text"
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a new word"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="definition">Definition</label>
          <input
            type="text"
            id="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Enter the definition"
            required
          />
        </div>
        
        <button type="submit" className="button">
          Add Card
        </button>
      </form>
    </div>
  );
};

export default CardForm; 