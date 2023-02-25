import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./TicTacToe.css";
import FancyButton from "../small/FancyButton";

/* 
  Esta tarea consiste en hacer que el juego funcione, para lograr eso deben completar el componente 
  TicTacToe y el custom hook `useTicTacToeGameState`, que como ven solamente define algunas variables.

  Para completar esta tarea, es requisito que la FIRMA del hook no cambie.
  La firma de una función consiste en los argumentos que recibe y el resultado que devuelve.
  Es decir, este hook debe recibir el argumento initialPlayer y debe devolver un objeto con las siguientes propiedades:
  {
    tiles: // un array de longitud 9 que representa el estado del tablero (es longitud 9 porque el tablero es 3x3)
    currentPlayer: // un string que representa el jugador actual ('X' o 'O')
    winner: // el ganador del partido, en caso que haya uno. si no existe, debe ser `null`
    gameEnded: // un booleano que representa si el juego terminó o no
    setTileTo: // una función que se ejecutará en cada click
    restart: // una función que vuelve a setear el estado original del juego
  }

  Verán que los diferentes componentes utilizados están completados y llevan sus propios propTypes
  Esto les dará algunas pistas
*/
///el juego de la memoria teminado, ahora vamos a completar esto
//este es la funcion que representa un cuadro, espera una funcion onclick de arriba(de otra funcion mayor)
//TABLERO HECHO, ahora vamos a enviearle informacion
//cuando la encontremos vamos a explicar lo que hace

const Square = ({ value, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(["X", "O", ""]),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx("winner-card", { "winner-card--hidden": !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};
WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(["X", "O"]),
  onRestart: PropTypes.func,
};
const getWinner = (cuadros) => {
  let ganador = "";
  const patrones = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let x = 0; x < 8; x++) {
    let [a, b, c] = patrones[x];

    if (
      cuadros[a] === cuadros[b] &&
      cuadros[a] === cuadros[c] &&
      cuadros[a] !== ""
    ) {
      return cuadros[a];

      break;
    }
  }
  return null;
};
let turno = 0;
const useTicTacToeGameState = (initialPlayer) => {
  const [cuadros, setCuadros] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const [winner, setWinner] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);

  let test = "X";
  const logicaDelClick = (e, indiceCuadro, jugador) => {
    console.log(e.target);
    console.log(e.target.innerText);
    console.log(indiceCuadro);
    console.log(" test anterior", test);
    if (test === "X") {
      test = "O";
    } else if (test === "O") {
      test = "X";
    }
    setTileTo(indiceCuadro, jugador);
    console.log(" test posterior", test);
    console.log(" cuadro", cuadros);

    turno += 1;
    console.log(turno);
  };

  const setTileTo = (indiceCuadro, jugador) => {
    setCuadros(
      cuadros.map((elemento, indice) =>
        indice === indiceCuadro ? jugador : elemento
      )
    );
    setPlayer();
  };
  const setPlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };
  const restart = () => {
    setGameEnded(false);
    setCuadros(Array(9).fill(""));
    setWinner(null);
    setCurrentPlayer(initialPlayer);
  };
  useEffect(() => {
    console.log(" GET WINNER", getWinner(cuadros));
    if (getWinner(cuadros) === "X" || getWinner(cuadros) === "O") {
      setWinner(getWinner(cuadros));
      setGameEnded(true);
    }
  });

  return {
    cuadros,
    currentPlayer,
    winner,
    gameEnded,
    logicaDelClick,
    setTileTo,
    restart,
  };
};

const TicTacToe = () => {
  const {
    cuadros,
    currentPlayer,
    winner,
    gameEnded,
    logicaDelClick,
    setTileTo,
    restart,
  } = useTicTacToeGameState("X");
  return (
    <div className="tictactoe">
      <WinnerCard show={gameEnded} winner={winner} onRestart={restart} />

      <div className="tictactoe-row">
        <Square
          value={cuadros[0]}
          onClick={(e) =>
            e.target.innerText === ""
              ? logicaDelClick(e, 0, currentPlayer)
              : console.log(" aca ya hay una letra")
          }
        />
        <Square
          value={cuadros[1]}
          onClick={(e) =>
            e.target.innerText === ""
              ? logicaDelClick(e, 1, currentPlayer)
              : console.log(" aca ya hay una letra")
          }
        />
        <Square
          value={cuadros[2]}
          onClick={(e) =>
            e.target.innerText === ""
              ? logicaDelClick(e, 2, currentPlayer)
              : console.log(" aca ya hay una letra")
          }
        />
      </div>
      <div className="tictactoe-row">
        <Square
          value={cuadros[3]}
          onClick={(e) =>
            e.target.innerText === ""
              ? logicaDelClick(e, 3, currentPlayer)
              : console.log(" aca ya hay una letra")
          }
        />
        <Square
          value={cuadros[4]}
          onClick={(e) =>
            e.target.innerText === ""
              ? logicaDelClick(e, 4, currentPlayer)
              : console.log(" aca ya hay una letra")
          }
        />
        <Square
          value={cuadros[5]}
          onClick={(e) =>
            e.target.innerText === ""
              ? logicaDelClick(e, 5, currentPlayer)
              : console.log(" aca ya hay una letra")
          }
        />
      </div>
      <div className="tictactoe-row">
        <Square
          value={cuadros[6]}
          onClick={(e) =>
            e.target.innerText === ""
              ? logicaDelClick(e, 6, currentPlayer)
              : console.log(" aca ya hay una letra")
          }
        />
        <Square
          value={cuadros[7]}
          onClick={(e) =>
            e.target.innerText === ""
              ? logicaDelClick(e, 7, currentPlayer)
              : console.log(" aca ya hay una letra")
          }
        />
        <Square
          value={cuadros[8]}
          onClick={(e) =>
            e.target.innerText === ""
              ? logicaDelClick(e, 8, currentPlayer)
              : console.log(" aca ya hay una letra")
          }
        />
      </div>
    </div>
  );
};
export default TicTacToe;
