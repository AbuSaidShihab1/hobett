import React, { useState, useEffect } from 'react';

const suits = ['♠️', '♦️', '♣️', '♥️'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const generateDeck = () => {
  let deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({ rank, suit });
    });
  });
  return deck;
};

const CardGamePage = () => {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [shuffling, setShuffling] = useState(false);

  useEffect(() => {
    setDeck(generateDeck());
  }, []);

  const shuffleDeck = () => {
    setShuffling(true);
    setTimeout(() => {
      const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
      setDeck(shuffledDeck);
      setShuffling(false);
    }, 1000);
  };

  const dealCards = () => {
    const handCards = deck.slice(0, 5);
    setHand(handCards);
    setDeck(deck.slice(5)); // Remove the dealt cards from the deck
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-6">Live Playing Card Game</h1>

        {/* Shuffle Button */}
        <button
          onClick={shuffleDeck}
          disabled={shuffling}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg mb-4"
        >
          {shuffling ? 'Shuffling...' : 'Shuffle Deck'}
        </button>

        {/* Deal Button */}
        <button
          onClick={dealCards}
          className="bg-green-600 text-white px-6 py-2 rounded-lg mb-6 ml-4"
        >
          Deal Cards
        </button>

        {/* Display Cards */}
        <div className="flex justify-center mt-4">
          {hand.length > 0 ? (
            hand.map((card, index) => (
              <div
                key={index}
                className="w-24 h-36 bg-white border-2 border-black rounded-lg m-2 flex justify-center items-center text-3xl"
              >
                <div>{card.rank} {card.suit}</div>
              </div>
            ))
          ) : (
            <div className="text-lg text-gray-500">No cards dealt yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardGamePage;
