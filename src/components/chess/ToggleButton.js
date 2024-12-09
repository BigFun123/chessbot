import { useContext, useState } from "react";
import { GameContext, useChessContext } from "./context";

const ToggleButton = (props) => {
    const [state, setState] = useState(false);

    const gameContext = useChessContext();

    function clicked() {
        console.log("clicked");
        setState(!state);
        props.onClick();
    }

    return (
        <div className={state ? "buttonselected" : "button"} onClick={clicked}>
            {props.label}
        </div>
    )
}

export default ToggleButton;