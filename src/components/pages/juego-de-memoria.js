//aca vamos a practicar esto, ya tenemos el codigo echo, asi que no vamos a hacer nuevo(espero),
import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Juego-de-memoria.css";
//import { Button } from 'react-bootstrap';
//funciones a modificar
//los query selector se pueden "cambiar" por una ref de react

//const tablero = document.querySelector("#tablero");
//const cuadros = tablero.querySelectorAll(".cuadro");
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
//bueno, esto ya casi esta, solo falta ver como activar esto, no es complicado parece
//vamos a hacerlo por partes y facil, activando lo menos posible a la vez...
//colorear tablero va a parte, asi que esta bien dejar su ejecucion suelta
///??? no puede ser? tan facil? literalmente cambie 2 lineas y agarro, raro...
//problema, el juego no puede terminar, el tamaño de la lista no llega a 0, por eso no termina
//listo, el problema era que habia agregado el "rojo" de manera manual a un cuadrito y mandaba error
//pero esto fue extrañanmente facil, debe de haber algo mal, solo cambie 2 o 3 cositas minimas...

function selecionarCelda(event, tablero) {
  /*
  console.log(event.target.className);
  if (event.target.classList.contains("cuadro")) {
    console.log(" lo tiene");
    console.log(tablero);
  }
  */

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
//aca terminan
//pero tenemos que aprender a controlar react, no solo saber leerlo
//NOTA: los componentes de react, tienen que empezar en mayuscula, sino tiran error
//cuadros listos y coloreados(pero trasparectes), ahora vamos a ver como los puedo tocar idividualmente
//listo la seleccion, ahora vamos a traer el resto
export function Board() {
  //const tablero = document.querySelector("#tablero");
  const tablero = useRef();
  console.log(ContadorTurnos);
  useEffect(() => {
    const tablero2 = document.querySelector("#tablero");
    const cuadros = tablero2.querySelectorAll(".cuadro");
    console.log(cuadros);
    console.log("querySelector ", tablero2);
    console.log("useRef ", tablero.current.querySelectorAll(".cuadro"));
    //console.log(e.target);
    colorearTablero(cuadros);
    ContadorTurnos += 1;
    console.log(ContadorTurnos);
    //tablero2.onclick = selecionarCelda(tablero2);
  });
  //const cuadros = tablero.querySelectorAll(".cuadro");
  //const cuadros = useRef();
  //esta es la funcion que se va a exportar, puede haber logica afuera, pero esta es la que arma el board

  return (
    <div>
      <Button variant="primary">Primary</Button>{" "}
      <Button variant="secondary">Secondary</Button>{" "}
      <Button variant="success">Success</Button>{" "}
      <Button variant="warning">Warning</Button>{" "}
      <Button variant="danger">Danger</Button>{" "}
      <Button variant="info">Info</Button>{" "}
      <Button variant="light">Light</Button>{" "}
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button>
      <Container>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
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
