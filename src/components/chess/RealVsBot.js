import { useEffect, setState, useState, useMemo, useReducer, useContext } from "react";
import { GameContext } from "./context";
import CChessboard from "./ChessBoard";

const RealVsBot = (props) => {

    const gameContext = useContext(GameContext);

    async function makeBotMove() {
        const possibleMoves = gameContext.game.moves()

        if (
            gameContext.game.isGameOver() === true ||
            gameContext.game.isDraw() === true ||
            possibleMoves.length === 0
        )
            return;

        const randomIndex = Math.floor(Math.random() * possibleMoves.length)
        const move = possibleMoves[randomIndex];

        
        await new Promise((resolve) => setTimeout(() => {
            gameContext.setMoveNumber(gameContext.moveNumber + 1);
            gameContext.game.move(move)
            console.log(move);
            gameContext.setPosition(gameContext.game.fen());
            gameContext.playSound("", 500);
            resolve();
        }, Math.random() * 1500 + 500));
    }

    return (
        <div className="vsbot">
            <CChessboard nextMove={makeBotMove} />
        </div>
    )
}

export default RealVsBot;