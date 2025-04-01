import { Card } from '../App';

// Define API base URL
const API_BASE_URL = 'http://localhost:5001/api';

// Fetch all cards
export const fetchCards = async (): Promise<Card[]> => {
  const response = await fetch(`${API_BASE_URL}/cards`);
  if (!response.ok) {
    throw new Error('Failed to fetch cards');
  }
  return response.json();
};

// Fetch known cards
export const fetchKnownCards = async (): Promise<Card[]> => {
  const response = await fetch(`${API_BASE_URL}/cards/known`);
  if (!response.ok) {
    throw new Error('Failed to fetch known cards');
  }
  return response.json();
};

// Fetch unknown cards
export const fetchUnknownCards = async (): Promise<Card[]> => {
  const response = await fetch(`${API_BASE_URL}/cards/unknown`);
  if (!response.ok) {
    throw new Error('Failed to fetch unknown cards');
  }
  return response.json();
};

// Add a new card
export const addCard = async (card: Card): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });
  return response.ok;
};

// Mark a card as known
export const markCardAsKnown = async (cardId: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/cards/known`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cardId }),
  });
  return response.ok;
};

// Mark a card as unknown
export const markCardAsUnknown = async (cardId: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/cards/unknown`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cardId }),
  });
  return response.ok;
};

// Delete a card
export const deleteCard = async (cardId: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
  });
  return response.ok;
}; 