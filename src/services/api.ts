import { Card } from '../App';

const API_URL = 'http://localhost:5000/api';

// Fetch all cards
export const fetchCards = async (): Promise<Card[]> => {
  try {
    const response = await fetch(`${API_URL}/cards`);
    if (!response.ok) {
      throw new Error('Failed to fetch cards');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
};

// Fetch known cards
export const fetchKnownCards = async (): Promise<Card[]> => {
  try {
    const response = await fetch(`${API_URL}/cards/known`);
    if (!response.ok) {
      throw new Error('Failed to fetch known cards');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching known cards:', error);
    return [];
  }
};

// Fetch unknown cards
export const fetchUnknownCards = async (): Promise<Card[]> => {
  try {
    const response = await fetch(`${API_URL}/cards/unknown`);
    if (!response.ok) {
      throw new Error('Failed to fetch unknown cards');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching unknown cards:', error);
    return [];
  }
};

// Add a new card
export const addCard = async (card: Card): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error adding card:', error);
    return false;
  }
};

// Mark a card as known
export const markCardAsKnown = async (cardId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/cards/known`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardId }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error marking card as known:', error);
    return false;
  }
};

// Mark a card as unknown
export const markCardAsUnknown = async (cardId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/cards/unknown`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardId }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error marking card as unknown:', error);
    return false;
  }
};

// Delete a card
export const deleteCard = async (cardId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/cards/${cardId}`, {
      method: 'DELETE',
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error deleting card:', error);
    return false;
  }
}; 