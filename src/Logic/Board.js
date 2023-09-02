import { winnerCombos } from "./Constans";

export const checkWinner = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
