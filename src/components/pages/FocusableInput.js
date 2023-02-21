import React, { useRef } from "react";
import FancyButton from "../small/FancyButton";
import FancyInput from "../small/FancyInput";
import "./FocusableInput.css";
//mmm, no me quedo muy claro esto, lo voy a explicar mas adelante
//es es una shit, es una gilada, basiacmente , el use ref, es un queryselector de react
//funciona asi, llamamos a useref(puede tener algo o no, le ponemos le nombre que queramos)
//luego, en algun componente de react, ponemos ref={nombreref}, ahora, lo tenemos selecionad, o listo
//para seleccionar, para usarlo para algo, como por ejemplo, hacer un focus....
//es eso solamente
const FocusableInput = () => {
  const inputRef = useRef();
  return (
    <div className="focusable-input-wrapper">
      {/* Qué pasa si cambiamos este input por nuestro FancyInput? */}
      <FancyInput className="focusable-input" ref={inputRef} />
      <FancyButton onClick={() => inputRef.current.focus()}>
        Focus that input!
      </FancyButton>
    </div>
  );
};
export default FocusableInput;
