import { useContext } from "react";
import { GameContext, useChessContext } from "./context";

const ChessButtonMini = (props) => {
    const gameContext = useChessContext();
    console.log(gameContext);
    
    return (
        <div className="buttonmini" onClick={props.onClick }>
            {props.label}
        </div>
    )
}

export default ChessButtonMini;