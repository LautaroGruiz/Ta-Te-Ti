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

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const upDateBoard = (index) => {
    // No actualizar la posicion si ya tiene marca.
    // Comentario para push
    if (board[index]) return;
    // Clonamos los datos del estado del tablero para crear un nuevo estado y actualizar.
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // Dependiendo del tipo de turno, sigue el otro.
    const newTurns = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurns);
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
