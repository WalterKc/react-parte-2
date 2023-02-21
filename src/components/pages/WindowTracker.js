import React, { useState, useEffect } from "react";

const WindowTracker = () => {
  //bueno, esto funciona mas o menos como el title changer, se setea un estado "width" con window.innerWidth
  //este ultimo te lo da el navegador, asi que no busques cosas raras.
  //luego se usa un efecto(funcion/cambio),luego , esta adentro tiene otra funcion "onChangeWidth"
  //que setea el estado "width" con un nuevo valor,
  //luego, a la ventana"window" se le agrega un listener de evento(ver esto, es nuevo), que llama
  //a la funcion deltro del useffect,
  //luego se le pone un return para darle un valor predeterminado
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onChangeWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", onChangeWidth);
    return () => window.removeEventListener("resize", onChangeWidth);
  });
  return <div>Window width: {width}</div>;
};
export default WindowTracker;
