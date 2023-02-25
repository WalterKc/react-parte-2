import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Juego-de-memoria.css";
function colorearTablero(cuadros) {
  let colores = ["rojo", "azul", "verde", "amarillo", "negro", "blanco"];
  const coloresRepetidos = colores.concat(colores);
  coloresRepetidos.sort(function () {
    return 0.5 - Math.random();
  });
  for (let i = 0; i < cuadros.length; i++) {
    cuadros[i].classList.add(coloresRepetidos[i]);
  }
}
let ContadorTurnos = 0;
let CuadroAnterior = 0;
let AcarreoActivo = false;

function selecionarCelda(event, tablero) {
  if (event.target.classList.contains("cuadro")) {
    if (!AcarreoActivo) {
      const cuadroSelecionado = event.target;
      if (Number(cuadroSelecionado.style.opacity) === 0 && !AcarreoActivo) {
        cuadroSelecionado.style.opacity = 1;
        CuadroAnterior = cuadroSelecionado;
        AcarreoActivo = true;
        ContadorTurnos += 1;
      } else if (Number(cuadroSelecionado.style.opacity) === 1) {
        cuadroSelecionado.style.opacity = 0;
        AcarreoActivo = false;
      }
    } else {
      const cuadrosActuales = tablero.querySelectorAll(".cuadro");
      console.log(cuadrosActuales.length);
      comprobarIgualdadDeCuadros(event.target, tablero);
    }
  }
}

function comprobarIgualdadDeCuadros(cuadroSelecionado, tablero) {
  if (AcarreoActivo) {
    cuadroSelecionado.style.opacity = 1;
    if (
      CuadroAnterior.classList[2] === cuadroSelecionado.classList[2] &&
      cuadroSelecionado !== CuadroAnterior
    ) {
      CuadroAnterior.parentElement.classList.add("completo");
      cuadroSelecionado.parentElement.classList.add("completo");
      CuadroAnterior.remove();
      cuadroSelecionado.remove();
      AcarreoActivo = false;
      evaluarFinDeJuego(tablero);
    } else {
      AcarreoActivo = false;
      setTimeout(function () {
        CuadroAnterior.style.opacity = 0;
      }, 200);
      setTimeout(function () {
        cuadroSelecionado.style.opacity = 0;
      }, 200);
    }
  }
}

function evaluarFinDeJuego(tablero) {
  const cuadrosActuales = tablero.querySelectorAll(".cuadro");
  if (cuadrosActuales.length === 0) {
    const mensajeFinJuego = document.querySelector("#fin-juego");
    mensajeFinJuego.querySelector("strong").textContent = ContadorTurnos;
    tablero.style.display = "none";
    let finDeJuego = document.querySelector("#fin-juego");
    finDeJuego.style.display = "block";
    console.log(" FIN DE JUEGO");
  }
}
export function Board() {
  const tablero = useRef();
  console.log(ContadorTurnos);
  useEffect(() => {
    const tablero2 = document.querySelector("#tablero");
    const cuadros = tablero2.querySelectorAll(".cuadro");
    console.log(cuadros);
    console.log("querySelector ", tablero2);
    console.log("useRef ", tablero.current.querySelectorAll(".cuadro"));
    colorearTablero(cuadros);
    ContadorTurnos += 1;
    console.log(ContadorTurnos);
  });

  return (
    <div>
      <Container>
        <Row></Row>
        <Row></Row>
      </Container>
      <Container>
        <Row></Row>
        <Row></Row>
      </Container>
      <div id="fin-juego">
        <p className="display-1">
          Fin del juego! Tardaste <strong>{/*<!-- -->*/}</strong> turnos en
          terminar.
        </p>
      </div>
      <div
        id="tablero"
        ref={tablero}
        onClick={(event) => selecionarCelda(event, tablero.current)}
      >
        <div className="container-fluid h-100">
          <div className="row fila-juego">
            <div className="col columna-juego ">
              <div className="cuadro h-100 "></div>
            </div>
            <div className="col columna-juego">
              <div className="cuadro h-100"></div>
            </div>
            <div className="col columna-juego">
              <div className="cuadro h-100"></div>
            </div>
          </div>
          <div className="row fila-juego">
            <div className="col columna-juego">
              <div className="cuadro h-100"></div>
            </div>
            <div className="col columna-juego">
              <div className="cuadro h-100"></div>
            </div>
            <div className="col columna-juego">
              <div className="cuadro h-100"></div>
            </div>
          </div>
          <div className="row fila-juego">
            <div className="col columna-juego">
              <div className="cuadro h-100"></div>
            </div>
            <div className="col columna-juego">
              <div className="cuadro h-100"></div>
            </div>
            <div className="col columna-juego">
              <div className="cuadro h-100"></div>
            </div>
          </div>
          <div className="row fila-juego">
            <div className="col columna-juego">
              <div className="cuadro h-100"></div>
            </div>
            <div className="col columna-juego">
              <div className="cuadro h-100"></div>
            </div>
            <div className="col columna-juego">
              <div className="cuadro h-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
