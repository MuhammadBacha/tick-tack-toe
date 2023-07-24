import React from "react";
import { useState } from "react";
import Box from "./Box";

function checkWinner(ticksArray, turn) {
  const winsArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  for (const winCombo of winsArray) {
    if (winCombo.every((val) => turn === ticksArray[val - 1])) {
      return true;
    }
  }
  return false;
}

function App() {
  const [ticksArray, setTicksArray] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [ending, setEnding] = useState("");
  const players = {
    X: "Player 1",
    O: "Player 2",
  };
  function resetGame() {
    setTicksArray(Array(9).fill(""));
    setEnding("");
    setTurn("X");
  }
  function handleClick(index) {
    if (ticksArray[index]) return; // Already clicked pe karna kiya hai xD

    /*
    When you click, you should do following things:
    - Mark the tick (from the turn)
    - Check for a win or draw
    - In case of win, end the game with winning message or draw message in case of draw.
    - Otherwise, Switch the turn
    */

    const ticksArrayCopy = [...ticksArray];
    ticksArrayCopy[index] = turn;
    setTicksArray(ticksArrayCopy);
    console.log(ticksArrayCopy);
    // React updates state asynchronously, so to get latest state, we use the modified copy, which was the TO-BE state.
    if (checkWinner(ticksArrayCopy, turn)) {
      setEnding(`${players[turn]} has won!`);
      return;
    }

    if (ticksArrayCopy.every((elm) => elm !== "")) {
      setEnding("It is a draw");
      return;
    }
    setTurn((prev) => (prev === "X" ? "O" : "X"));
  }
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center disabled bg-black text-white">
      <h1 className="text-5xl text-center m-3 font-bold ">TICK TACK TOE</h1>
      <div className="w-[250px] md:w-[350px]">
        <div className="grid grid-cols-2 text-xl md:text-3xl">
          {Object.entries(players).map((playerInfo) => (
            // playerInfo = ['X','Player 1'] and so on ...
            <h2
              key={playerInfo[1] || playerInfo[0]}
              className={`flex items-center justify-center font-bold text-black py-1 ${
                turn === playerInfo[0] && "bg-white"
              }`}
            >
              <span className="font-bold mx-2">{playerInfo[0]}</span>
              {playerInfo[1]}
            </h2>
          ))}
        </div>
        <div
          className={`h-[250px] md:h-[350px] grid grid-rows-3 grid-cols-3  border-2 border-solid border-black ${
            ending && "pointer-events-none"
          }`}
        >
          {ticksArray.map((_, index) => (
            <Box
              key={index}
              tick={ticksArray[index]}
              turn={turn}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
      {ending && (
        <div className="flex flex-col items-center my-2 gap-1">
          <h2 className="text-3xl font-bold">{ending}</h2>
          <button
            className="text-2xl border-2 border-solid rounded-xl hover:text-black hover:bg-white border-white p-2"
            onClick={resetGame}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
