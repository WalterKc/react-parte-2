import React, { useState } from "react";
import FancyInput from "../small/FancyInput";

//esto es un estado personalizado, tiene la misma funcion que titlechanger, igual se va a explicar lo diferente
//
const useInputState = (initialValue) => {
  //esto es una funcion que pide un valor"initialValue", y luego setea ese valor al "value"
  //luego, retorna el valor y un evento/funcion/listener
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (event) => setValue(event.target.value),
  };
};
//aca se llama/usa la funcion de arriba, y el imput,(no entiendo los 3 puntitos)
const CustomHook = () => {
  const input = useInputState("");
  return <FancyInput title="Custom hook" {...input} />;
};
export default CustomHook;
