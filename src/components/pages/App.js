import React, { useState } from "react";
import Home from "./Home";
import TitleChanger from "./TitleChanger";
import "./App.css";
import WindowTracker from "./WindowTracker";
import CustomHook from "./CustomHook";
import FocusableInput from "./FocusableInput";
import UglyClass from "./UglyClass";
import FancyButton from "../small/FancyButton";
import TicTacToe from "./TicTacToe";
import { tablero } from "./juego-de-memoria";
import "bootstrap/dist/css/bootstrap.min.css";

//bueno, esto lo vamos a tocar por todos lados, hasta que no este conforme, no vamos a pasar a la clase 3
//asumo que voy a estar varios dias aca
//
const pages = {
  home: {
    name: "Home",
    component: Home,
  },
  titleChanger: {
    name: "Title Changer",
    component: TitleChanger,
  },
  windowTracker: {
    name: "Window Tracker",
    component: WindowTracker,
  },
  customHook: {
    name: "Custom Hook",
    component: CustomHook,
  },
  focusableInput: {
    name: "Focusable Input",
    component: FocusableInput,
  },
  uglyClass: {
    name: "Ugly Class",
    component: UglyClass,
  },
  ticTacToe: {
    name: "Tic Tac Toe",
    component: TicTacToe,
  },
  juegoMemoria: {
    name: "juego Memoria",
    component: tablero,
  },
};
let keys = Object.keys(pages); //otra manera mas comoda ,transforma el array de objetos en un array normal

function App() {
  //explicacion ,esto es un estado/flag de una clase, es solo eso, un estado, en vez de hacer
  //"estadi/flag"=algo y actualizarlo , se usa esto, funciona exactamente igual ,pero se actualiza
  //con su funcion set, en vez de hacerlo manualmente, es compatible con otras funciones tambien
  //asi que no hay que cambiar nada, solamente no se entendia bien que era
  const [currentPage, setCurrentPage] = useState("home");
  console.log(currentPage);
  console.log(pages[currentPage]);
  //bueno, esto es bastante lindo la verdad, vamos a explicarlo para que quede claro
  //lo que se hace aca, es crear una const "CurrentComponent"(componente actual),esta lo que hace es
  //selecionar el componente actual, como? se usa la estructura de mas arriba "pages" y el estado "currentPage"
  //de la siguiente manera.
  //seleciona "pages", este al ser un array de objetos, solo te deja seleccionar por keys, la key
  //es "currentPage", que la seteamos arriba con el valor "home", esta, asu vez, tiene otro array
  //adentro, con "name" y "component", seleccionamos esta ultima con .component, esta,
  //a su vez, contiene un componente de react (Home en este caso),esto esta echo para que se pueda
  //seleccionar todos los componentes de pages

  /////BUENO, COMO ESTO QUEDO CLARO(CASI TODO), VAMOS A PRIMERO HACER EL JUEGO DE LA MEMORIA, LO VEO
  /////MAS INTERESANTE POR QUE TENGO QUE ARMARLO DESDE 0
  /////VAMOS AGREGARLO ACA
  //el codigo va a ser casi igual, pero el react va a ser nuevo, tengo que ver como lo hago,
  //lo primero va a ser un cuadro seleccionable(para practicar)
  const CurrentComponent = pages[currentPage].component;

  //test
  // el nombre "key" es albitrario, se podria llamar x y daria el mismo resultado
  for (let key in pages) {
    console.log(key);
  }
  for (let value in Object.values(pages)) {
    console.log(value);
  }
  console.log(pages);
  console.log(keys.length);

  //test
  //esto es bastante estandar, pero voy a explicar lo nuevo
  return (
    <div className="app">
      <nav className="app-navigation">
        {/* bueno, esto es bastante asco, pero entendible, vamos a explicarlo,
        el object entries devuelve las keys y los values de un array de objetos
        el map, es una funcion de js que "copia"un array, y le aplica algo(una funcion o otra cosa)
        sin alterar el original, en este caso, le ponemos a key/value el nombre pagekey/pagedata.
         */}
        {Object.entries(pages).map(([pageKey, pageData]) => (
          <FancyButton
            //esto del active tiene algo que ver con el fancy button, buscalo y agregalo mas tarde
            active={pageKey === currentPage}
            key={pageKey}
            //esto del navigation, creo que tambien
            navigation
            onClick={() => setCurrentPage(pageKey)}
          >
            {/*este no se que hace aca suelto, pero algo del nombre es */}
            {pageData.name}
          </FancyButton>
        ))}
      </nav>
      {/*esto es el titulo de la pagina, y tambien setea el name, al name actual de la pagina
      (no se por que la verdad) */}
      <header className="app-page-title">{pages[currentPage].name}</header>

      <div className="app-content">
        <CurrentComponent name={pages[currentPage].name} />
      </div>
    </div>
  );
}

export default App;
