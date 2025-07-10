
import React, { useMemo } from 'react';
import allValues from './values'; // Import the complete list of values

function ResultsScreen({ choices }) {
  const ranking = useMemo(() => {
    const scores = {};

    // Initialize scores for all values to 0
    allValues.forEach(value => {
      scores[value.name] = 0;
    });

    // Increment scores for chosen winners
    choices.forEach(({ winner }) => {
      scores[winner.name] = (scores[winner.name] || 0) + 1;
    });

    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([name, score]) => ({ name, score }));
  }, [choices]);

  return (
    <div className="results-container">
      <h2>Your Value Ranking</h2>
      <ol>
        {ranking.map((value, index) => (
          <li key={index}>
            <strong>{value.name}</strong> (Score: {value.score})
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ResultsScreen;
