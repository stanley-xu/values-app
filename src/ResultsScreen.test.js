import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsScreen from './ResultsScreen';
import '@testing-library/jest-dom';

// Mock the values module to control the data used in tests
jest.mock('./values', () => [
  { id: 1, name: 'Value A', description: 'Desc A' },
  { id: 2, name: 'Value B', description: 'Desc B' },
  { id: 3, name: 'Value C', description: 'Desc C' },
]);

describe('ResultsScreen', () => {
  it('displays the ranking of chosen values', () => {
    const mockChoices = [
      { winner: { id: 1, name: 'Value A' }, loser: { id: 2, name: 'Value B' } },
      { winner: { id: 1, name: 'Value A' }, loser: { id: 3, name: 'Value C' } },
      { winner: { id: 2, name: 'Value B' }, loser: { id: 3, name: 'Value C' } },
    ];

    render(<ResultsScreen choices={mockChoices} />);

    // Expect Value A to have a score of 2, Value B a score of 1, and Value C a score of 0
    // Check the order of the list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Value A (Score: 2)');
    expect(listItems[1]).toHaveTextContent('Value B (Score: 1)');
    expect(listItems[2]).toHaveTextContent('Value C (Score: 0)');
  });

  it('handles no choices gracefully', () => {
    render(<ResultsScreen choices={[]} />);

    // All values should be displayed with a score of 0
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Value A (Score: 0)');
    expect(listItems[1]).toHaveTextContent('Value B (Score: 0)');
    expect(listItems[2]).toHaveTextContent('Value C (Score: 0)');
  });

  it('updates ranking when choices change', () => {
    const { rerender } = render(<ResultsScreen choices={[]}/>);

    let listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Value A (Score: 0)');

    const newChoices = [
      { winner: { id: 1, name: 'Value A' }, loser: { id: 2, name: 'Value B' } },
    ];

    rerender(<ResultsScreen choices={newChoices} />);

    listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Value A (Score: 1)');
    expect(listItems[1]).toHaveTextContent('Value B (Score: 0)');
  });
});
