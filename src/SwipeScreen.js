
import React, { useState, useMemo } from 'react';

function SwipeScreen({ values, onChoice, onCompletion }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create all unique pairs to compare
  const pairs = useMemo(() => {
    const result = [];
    for (let i = 0; i < values.length; i++) {
      for (let j = i + 1; j < values.length; j++) {
        result.push([values[i], values[j]]);
      }
    }
    // Shuffle the pairs to ensure random order
    return result.sort(() => 0.5 - Math.random());
  }, [values]);

  const currentPair = pairs[currentIndex];

  const handleCardClick = (clickedValue) => {
    if (!currentPair) return;

    const winner = clickedValue;
    const loser = winner.id === currentPair[0].id ? currentPair[1] : currentPair[0];
    onChoice(winner, loser);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= pairs.length) {
      onCompletion();
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  if (!currentPair) {
    return <div>Loading pairs...</div>;
  }

  return (
    <div className='swipe-container'>
      <h2>Which value is more important to you?</h2>
      <div className='card-container' style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
        {currentPair.map((value) => (
          <div
            className='card'
            key={value.id}
            onClick={() => handleCardClick(value)}
            style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '8px', flex: 1, maxWidth: '45%' }}
          >
            <h3>{value.name}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
      <div className="instructions">
        <p>Click on the value that is more important to you.</p>
      </div>
    </div>
  );
}

export default SwipeScreen;
