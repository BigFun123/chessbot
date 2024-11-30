import { useContext } from "react";
import { GameContext, useChessContext } from "./context";

const ChessButton = (props) => {
    const gameContext = useChessContext();
    console.log(gameContext);
    
    return (
        <div className="button" onClick={props.onClick }>
            {props.label}
        </div>
    )
}

export default ChessButton;