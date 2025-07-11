import React, { useState } from 'react';
import SwipeScreen from './SwipeScreen';
import ResultsScreen from './ResultsScreen';
import values from './values';
import './App.css';

function App() {
  const [userChoices, setUserChoices] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleChoice = (winner, loser) => {
    setUserChoices([...userChoices, { winner, loser }]);
  };

  const handleCompletion = () => {
    setShowResults(true);
  };

  return (
    <div className="App">
      <h1>Discover Your Values</h1>
      {showResults ? (
        <ResultsScreen choices={userChoices} />
      ) : (
        <SwipeScreen 
          values={values} 
          onChoice={handleChoice} 
          onCompletion={handleCompletion} 
        />
      )}
    </div>
  );
}

export default App;