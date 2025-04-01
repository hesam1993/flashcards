import { Card } from '../App';

// Initial sample cards
const sampleCards: Card[] = [
  {
    id: '1',
    word: 'Ephemeral',
    definition: 'Lasting for a very short time'
  },
  {
    id: '2',
    word: 'Ubiquitous',
    definition: 'Present, appearing, or found everywhere'
  },
  {
    id: '3',
    word: 'Serendipity',
    definition: 'The occurrence of events by chance in a happy or beneficial way'
  },
  {
    id: '4',
    word: 'Paradigm',
    definition: 'A typical example or pattern of something'
  },
  {
    id: '5',
    word: 'Eloquent',
    definition: 'Fluent or persuasive in speaking or writing'
  }
];

// Local storage keys
const STORAGE_KEYS = {
  CARDS: 'flashcards_cards',
  KNOWN_CARDS: 'flashcards_known_cards',
  UNKNOWN_CARDS: 'flashcards_unknown_cards'
};

// Initialize local storage with sample data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.CARDS)) {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(sampleCards));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.KNOWN_CARDS)) {
    localStorage.setItem(STORAGE_KEYS.KNOWN_CARDS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.UNKNOWN_CARDS)) {
    localStorage.setItem(STORAGE_KEYS.UNKNOWN_CARDS, JSON.stringify([]));
  }
};

// Initialize on import
initializeStorage();

// Mock API functions that use localStorage
export const fetchCards = async (): Promise<Card[]> => {
  const cards = localStorage.getItem(STORAGE_KEYS.CARDS);
  return cards ? JSON.parse(cards) : [];
};

export const fetchKnownCards = async (): Promise<Card[]> => {
  const knownCardIds = localStorage.getItem(STORAGE_KEYS.KNOWN_CARDS);
  const allCards = await fetchCards();
  const knownIds = knownCardIds ? JSON.parse(knownCardIds) : [];
  
  return allCards.filter(card => knownIds.includes(card.id));
};

export const fetchUnknownCards = async (): Promise<Card[]> => {
  const unknownCardIds = localStorage.getItem(STORAGE_KEYS.UNKNOWN_CARDS);
  const allCards = await fetchCards();
  const unknownIds = unknownCardIds ? JSON.parse(unknownCardIds) : [];
  
  return allCards.filter(card => unknownIds.includes(card.id));
};

export const addCard = async (card: Card): Promise<boolean> => {
  try {
    const cards = await fetchCards();
    const updatedCards = [card, ...cards];
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(updatedCards));
    return true;
  } catch (error) {
    console.error('Error adding card:', error);
    return false;
  }
};

export const markCardAsKnown = async (cardId: string): Promise<boolean> => {
  try {
    // Get current known and unknown cards
    const knownCardIds = localStorage.getItem(STORAGE_KEYS.KNOWN_CARDS);
    const unknownCardIds = localStorage.getItem(STORAGE_KEYS.UNKNOWN_CARDS);
    
    let knownIds = knownCardIds ? JSON.parse(knownCardIds) : [];
    let unknownIds = unknownCardIds ? JSON.parse(unknownCardIds) : [];
    
    // Add to known if not already there
    if (!knownIds.includes(cardId)) {
      knownIds.push(cardId);
    }
    
    // Remove from unknown if it's there
    unknownIds = unknownIds.filter((id: string) => id !== cardId);
    
    // Save back to localStorage
    localStorage.setItem(STORAGE_KEYS.KNOWN_CARDS, JSON.stringify(knownIds));
    localStorage.setItem(STORAGE_KEYS.UNKNOWN_CARDS, JSON.stringify(unknownIds));
    
    return true;
  } catch (error) {
    console.error('Error marking card as known:', error);
    return false;
  }
};

export const markCardAsUnknown = async (cardId: string): Promise<boolean> => {
  try {
    // Get current unknown cards
    const unknownCardIds = localStorage.getItem(STORAGE_KEYS.UNKNOWN_CARDS);
    let unknownIds = unknownCardIds ? JSON.parse(unknownCardIds) : [];
    
    // Add to unknown if not already there
    if (!unknownIds.includes(cardId)) {
      unknownIds.push(cardId);
    }
    
    // Save back to localStorage
    localStorage.setItem(STORAGE_KEYS.UNKNOWN_CARDS, JSON.stringify(unknownIds));
    
    return true;
  } catch (error) {
    console.error('Error marking card as unknown:', error);
    return false;
  }
};

export const deleteCard = async (cardId: string): Promise<boolean> => {
  try {
    const cards = await fetchCards();
    const updatedCards = cards.filter(card => card.id !== cardId);
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(updatedCards));
    
    // Also remove from known and unknown lists
    const knownCardIds = localStorage.getItem(STORAGE_KEYS.KNOWN_CARDS);
    const unknownCardIds = localStorage.getItem(STORAGE_KEYS.UNKNOWN_CARDS);
    
    let knownIds = knownCardIds ? JSON.parse(knownCardIds) : [];
    let unknownIds = unknownCardIds ? JSON.parse(unknownCardIds) : [];
    
    knownIds = knownIds.filter((id: string) => id !== cardId);
    unknownIds = unknownIds.filter((id: string) => id !== cardId);
    
    localStorage.setItem(STORAGE_KEYS.KNOWN_CARDS, JSON.stringify(knownIds));
    localStorage.setItem(STORAGE_KEYS.UNKNOWN_CARDS, JSON.stringify(unknownIds));
    
    return true;
  } catch (error) {
    console.error('Error deleting card:', error);
    return false;
  }
}; 