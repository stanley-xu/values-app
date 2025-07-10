import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SwipeScreen from './SwipeScreen';
import '@testing-library/jest-dom';

jest.mock('./values', () => [
  { id: 1, name: 'Value A', description: 'Description A' },
  { id: 2, name: 'Value B', description: 'Description B' },
  { id: 3, name: 'Value C', description: 'Description C' },
]);

import values from './values';

describe('SwipeScreen', () => {
  it('renders two distinct value cards', () => {
    render(
      <SwipeScreen
        values={values}
        onChoice={() => {}}
        onCompletion={() => {}}
      />
    );

    const cards = screen.getAllByRole('heading', { level: 3 });
    expect(cards).toHaveLength(2);

    const cardNames = cards.map(card => card.textContent);
    expect(cardNames[0]).not.toBe(cardNames[1]); // Ensure distinct values
    expect(values.some(val => val.name === cardNames[0])).toBe(true);
    expect(values.some(val => val.name === cardNames[1])).toBe(true);
  });

  it('calls onChoice with correct values and advances to next pair', () => {
    const handleChoice = jest.fn();
    const handleCompletion = jest.fn();

    render(
      <SwipeScreen
        values={values}
        onChoice={handleChoice}
        onCompletion={handleCompletion}
      />
    );

    // Get the initial cards
    let cards = screen.getAllByRole('heading', { level: 3 });
    let clickedCard = cards[0];
    let otherCard = cards[1];

    fireEvent.click(clickedCard);

    expect(handleChoice).toHaveBeenCalledWith(
      expect.objectContaining({ name: clickedCard.textContent }),
      expect.objectContaining({ name: otherCard.textContent })
    );

    // After the first click, the component re-renders with a new pair.
    // We need to re-query the DOM for the new cards.
    cards = screen.getAllByRole('heading', { level: 3 });
    clickedCard = cards[0];
    otherCard = cards[1];

    fireEvent.click(clickedCard);

    expect(handleChoice).toHaveBeenCalledWith(
      expect.objectContaining({ name: clickedCard.textContent }),
      expect.objectContaining({ name: otherCard.textContent })
    );

    cards = screen.getAllByRole('heading', { level: 3 });
    clickedCard = cards[0];
    otherCard = cards[1];

    fireEvent.click(clickedCard);

    expect(handleChoice).toHaveBeenCalledWith(
      expect.objectContaining({ name: clickedCard.textContent }),
      expect.objectContaining({ name: otherCard.textContent })
    );

    expect(handleCompletion).toHaveBeenCalledTimes(1);
  });

  it('displays loading message when no current pair', () => {
    render(
      <SwipeScreen
        values={[]}
        onChoice={() => {}}
        onCompletion={() => {}}
      />
    );
    expect(screen.getByText('Loading pairs...')).toBeInTheDocument();
  });
});
