import { useState } from "react";
import Player from "./components/PlayerInfo.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { Possible_Winning_Combinations } from "./possible_winning_combinations.js";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS = {
  X: 'player 1',
  O: 'player 2'
};
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]; // To make a copy of initial array to work with
  
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}


function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of Possible_Winning_Combinations) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]; // ex: 'X'
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col]; // ex: 'O'
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]; // ex: 'X'

    if (
      firstSquareSymbol && // check if the square is truthy (not null)
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const Draw = gameTurns.length === 9 && !winner;

  function hadnleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X");
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTruns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTruns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  } 
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol]: newName
      };
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initalName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
            />
          <Player
            initalName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || Draw) && <GameOver winner={winner} onRestart={handleRestart} />}  
        <GameBoard onSelectSquare={hadnleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
export default App;
