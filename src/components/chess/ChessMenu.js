import { useEffect, setState, useState, useMemo, useReducer, useContext } from "react";
import { ChessContextProvider, GameContext, useChessContext } from "./context";
import { Chess } from 'chess.js';
import './Chess.css';
import players from  './players.json';
import RealVsBot from "./RealVsBot";
import StockFish from "./StockFish";
import Avatar from "./Avatar";
import ChessButton from "./ChessButton";
import ChessCard from "./ChessCard";

console.log(players);

const ChessMenu = () => {
    const chessContext = useChessContext();
    const {backStory} = useChessContext();

    useEffect(() => {
        console.log("Game State: ", chessContext.gameState);
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
        newGame(chessContext.orientation==="white"?"black":"white");
    }

    return (
        <div className="chess-container">

            {chessContext.gameState === "menu" &&
                <div className="mainScreen">
                    <div className="chessmenu">
                        <div className="gameavatar">
                            <Avatar />
                            <ChessCard/>

                        </div>
                        {players.map((player) => {
                            return <Avatar avatar={player.name} skill={player.skill} engine={player.engine} backstory={player.backstory} />
                        })}
                        {/* <Avatar avatar="Jenny" skill={1} engine={"bot"} />
                        <Avatar avatar="Jake" skill={2} engine={"stock"} />
                        <Avatar avatar="Ibrahim" skill={3} engine={"stock"} />
                        <Avatar avatar="Thembi" skill={4} engine={"stock"} />
                        <Avatar avatar="Almaria" skill={5} engine={"stock"} />
                        <Avatar avatar="Kang Min" skill={8} engine={"stock"} />
                        <Avatar avatar="Ivan" skill={13} engine={"stock"} />
                        <Avatar avatar="Wu Tang" skill={20} engine={"stock"} />                                                 */}
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
            {chessContext.gameState == "game" && chessContext.engine === "bot" &&
                <div>
                    <RealVsBot>
                    </RealVsBot>
                </div>}
            {chessContext.gameState === "game" && chessContext.engine === "stock" &&
                <div>                    
                    <StockFish>
                    </StockFish>
                </div>
            }
        </div>
    )
}

export default ChessMenu;