import React, { useState } from 'react';

const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [error, setError] = useState('');

  const handleChange = (e, row, col) => {
    const newBoard = [...board];
    const value = e.target.value;

    if (/^[1-9]$/.test(value) || value === '') {
      newBoard[row][col] = value === '' ? 0 : parseInt(value);
    }

    setBoard(newBoard);
  };

  const validateBoard = () => {
    if (isBoardValid(board)) {
      setError('');
      alert('Sudoku is correct!');
    } else {
      setError('There are errors in the solution.');
    }
  };

  const isBoardValid = (board) => {
    // Check rows, columns, and 3x3 subgrids for duplicates
    return (
      checkRows(board) &&
      checkColumns(board) &&
      checkSubgrids(board)
    );
  };

  const checkRows = (board) => {
    for (let row = 0; row < 9; row++) {
      const seen = new Set();
      for (let col = 0; col < 9; col++) {
        const value = board[row][col];
        if (value !== 0 && seen.has(value)) {
          return false;
        }
        if (value !== 0) seen.add(value);
      }
    }
    return true;
  };

  const checkColumns = (board) => {
    for (let col = 0; col < 9; col++) {
      const seen = new Set();
      for (let row = 0; row < 9; row++) {
        const value = board[row][col];
        if (value !== 0 && seen.has(value)) {
          return false;
        }
        if (value !== 0) seen.add(value);
      }
    }
    return true;
  };

  const checkSubgrids = (board) => {
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const seen = new Set();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const value = board[row + i][col + j];
            if (value !== 0 && seen.has(value)) {
              return false;
            }
            if (value !== 0) seen.add(value);
          }
        }
      }
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl mb-6">Sudoku</h1>
      <div className="grid grid-cols-9 gap-1 mb-6">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              value={cell === 0 ? '' : cell}
              onChange={(e) => handleChange(e, rowIndex, colIndex)}
              className="w-12 h-12 text-center bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={initialBoard[rowIndex][colIndex] !== 0}
            />
          ))
        )}
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex gap-[50px]">
      <button
        onClick={validateBoard}
        className="bg-blue-500 text-white p-4 rounded-xl mb-6 hover:bg-blue-600"
      >
        Check Solution
      </button>
      <button
        onClick={() => setBoard(initialBoard)}
        className="bg-gray-500 text-white p-4 rounded-xl h-[58px] hover:bg-gray-600"
      >
        Reset Game
      </button>
      </div>
    </div>
  );
};

export default App;
