import { useEffect, setState, useState, useMemo, useReducer, useContext } from "react";
import { ChessContextProvider, GameContext, useChessContext } from "./context";
import { Chess } from 'chess.js';
import './Chess.css';

import RealVsBot from "./RealVsBot";
import StockFish from "./StockFish";
import Avatar from "./Avatar";
import ChessButton from "./ChessButton";
import ChessCard from "./ChessCard";
import RealVsReal from "./RealVsReal";


const ChessMenu = () => {
    const chessContext = useChessContext();

    useEffect(() => {
        console.log("Game State: ", chessContext.gameState);
        console.log(GameContext.players);
    }, [chessContext.gameState]);

    function newGame(orientation) {
        chessContext.restart();
        chessContext.setOrientation(orientation);
        chessContext.setGameState("game");
    }

    function exit() {
        chessContext.setGameState("menu");
    }

    function restart() {
        //chessContext.restart();
        //chessContext.setOrientation(chessContext.orientation==="white"?"black":"white");        
        //chessContext.setGameState("game");
        newGame(chessContext.orientation === "white" ? "black" : "white");
    }

    function onAvatarClick(avatar) {
        console.log("Avatar Clicked: ", avatar);
        chessContext.setPlayers(chessContext.players.map(
            player => player.name === avatar.name ?
                { ...player, selected: true }
                : {...player, selected: false}
        ));
        //avatar.selected = true;
    }

    return (
        <div className="chess-container">
            {console.log(chessContext.players)}
            {/* {chessContext.gameState === "menu" && <Avatar />} */}
            {chessContext.gameState === "menu" && <ChessCard />}
            {chessContext.gameState === "menu" &&
                <div className="mainScreen">
                    <div className="chessmenu">
                        {chessContext.players.map((player) => {
                            return <Avatar key={player.key} onClick={onAvatarClick} name={player.name} avatar={player.name} skill={player.skill} engine={player.engine} backstory={player.backstory} selected={player.selected} />
                        })}
                    </div>
                    <div className="chessButtons">
                        <ChessButton label="Start White" state="game" onClick={() => newGame("white")}> </ChessButton>
                        <ChessButton label="Start Black" state="game" onClick={() => newGame("black")}> </ChessButton>
                    </div>
                </div>
            }

            {chessContext.gameState === "game" &&
                <div className="topchessmenu">
                    <ChessButton label="Exit" state="menu" onClick={() => exit()}>Exit</ChessButton>
                    <ChessButton label="Rematch" state="menu" onClick={() => restart()}>Rematch</ChessButton>
                </div>
            }

            {chessContext.gameState === "game" && <div className="gameavatar"><Avatar /></div>}
            {chessContext.gameState == "game" && chessContext.engine === "bot" &&
                <RealVsBot></RealVsBot>}
            {chessContext.gameState === "game" && chessContext.engine === "stock" &&
                <StockFish></StockFish>}
            {chessContext.gameState === "game" && chessContext.engine === "real" &&
                <RealVsReal></RealVsReal>}
        </div>
    )
}

export default ChessMenu;