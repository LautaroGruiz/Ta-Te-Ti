import { useState } from "react";
import confetti from "canvas-confetti";
import Square from "./Components/Square";
import { TURNS } from "./Logic/Constans";
import { checkWinner, checkEndGame } from "./Logic/Board";
import WinnerModal from "./Components/WinnerModal";

const App = () => {
  const [board, setBoard] = useState(() => {
    const boardFromStroge = window.localStorage.getItem("board");
    if (boardFromStroge) return JSON.parse(boardFromStroge);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStroge = window.localStorage.getItem("turn");
    return turnFromStroge ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const upDateBoard = (index) => {
    // No actualizar la posicion si ya tiene marca.
    if (board[index] || winner) return;
    // Clonamos los datos del estado del tablero para crear un nuevo estado y actualizar.
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // Dependiendo del tipo de turno, sigue el otro.
    const newTurns = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurns);
    // Guardar partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurns);
    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  return (
    <>
      <main className="board">
        <button onClick={resetBoard}>Reset del juego</button>
        <section className="game">
          {board.map((square, index) => {
            return (
              <Square key={index} index={index} upDateBoard={upDateBoard}>
                {square}
              </Square>
            );
          })}
        </section>
        <section className="turns">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        <section className="">
          <WinnerModal resetBoard={resetBoard} winner={winner} />
        </section>
      </main>
    </>
  );
};

export default App;
