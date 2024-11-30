import { useEffect } from "react";
import { useChessContext } from "./context";

const ChessCard = (props) => {    
    const {backStory} = useChessContext();
    

    return (
        <div className="card">
            {backStory}
        </div>
    )
}

export default ChessCard;