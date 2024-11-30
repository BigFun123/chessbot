import { useEffect, setState, useState, useMemo, useReducer, useContext } from "react";
import { GameContext } from "./context";

const RandomGame = (props) => {
    const gameContext = useContext(GameContext);

    useEffect(() => {
        makeRandomMove()
    }, [gameContext.moveNumber])

    function makeRandomMove() {        
        const possibleMoves = gameContext.game.moves()

        if (
            gameContext.game.isGameOver() === true ||
            gameContext.game.isDraw() === true ||
            possibleMoves.length === 0
        )
            return;


        const randomIndex = Math.floor(Math.random() * possibleMoves.length)
        const move = possibleMoves[randomIndex];
        gameContext.game.move(move)
        console.log(move);
        //gameContext.game.setPosition(gameContext.game.fen())
    }

    return (
        <div className="random">
            {props.children}
        </div>
    )

}

export default RandomGame;