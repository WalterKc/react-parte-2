import React, { useState, useEffect } from "react";
import FancyInput from "../small/FancyInput";
//odio estas funciones flecha, pero creo que ya les estoy agarrando la mano
const TitleChanger = () => {
  const [value, setValue] = useState("");
  //este user effect, no es mas que un modificador, es como cuando , luego de que pase algo
  //(con un if por ejemplo) llamamos a una funcion o modificamos un flag manualmente,
  //no es mas que eso
  //entonces, esto lo que haria seria que, cada vez que pase algo en esta funcion, se activa el usereffect
  //(en este caso se usa para cambiar el nombre al titulo, pero podria ser cualquier cosa)
  //como por ejemplo, un console log
  useEffect(() => {
    document.title = value;
    console.log(value);
    //este retunr es para cuando se salga de la pagina,y vuelva a tener un titulo predeterminado
    return () => {
      document.title = "React App";
    };
  });
  return (
    <FancyInput
      title="Cambiame!"
      value={value}
      //aca se envia el input, por medio de un evento
      onChange={(event) => setValue(event.target.value)}
    />
  );
};
export default TitleChanger;
