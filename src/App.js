import React, { useState } from 'react';
import ChoiceScreen from './ChoiceScreen';
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

  const handleBack = () => {
    setUserChoices(prevChoices => prevChoices.slice(0, prevChoices.length - 1));
  };

  return (
    <div className="App">
      <h1>Discover Your Values</h1>
      {showResults ? (
        <ResultsScreen choices={userChoices} />
      ) : (
        <ChoiceScreen 
          values={values} 
          onChoice={handleChoice} 
          onCompletion={handleCompletion} 
          onBack={handleBack}
          currentProgress={userChoices.length}
        />
      )}
    </div>
  );
}

export default App;