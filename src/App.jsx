import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, upDateBoard, index }) => {
  const className = `square ${isSelected ? `is-selected` : ""}`;
  const handleClick = () => {
    upDateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    // Recorremos el array winnerCombos y traemos sus valores.
    // Checkear si hay in ganador
    for (const combo of winnerCombos) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  const upDateBoard = (index) => {
    // No actualizar la posicion si ya tiene marca.
    if (board[index] ||  winner) return;
    // Clonamos los datos del estado del tablero para crear un nuevo estado y actualizar.
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // Dependiendo del tipo de turno, sigue el otro.
    const newTurns = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurns);
    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <>
      <main className="board">
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square key={index} index={index} upDateBoard={upDateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>
        <section className="turns">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
      </main>
    </>
  );
};

export default App;
