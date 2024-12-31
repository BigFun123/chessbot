
import { Chess } from 'chess.js';
import { createContext, useContext, useState } from 'react';
import playSound from "./AudioPlayer";

import jplayers from './players.json';


const game = new Chess();
game.uniqueId = new Date();
console.log("new game", game);
console.log(jplayers);

const GameContext = createContext(
    /*{
    position: 'start',
    orientation: "white",
    game: new Chess(),
    moveNumber: 0
}*/
    { gameState: "menu" }
);

const ChessContextProvider = (props) => {
    const [skillLevel, setSkillLevel] = useState(1);
    const [avatar, setAvatar] = useState("Jenny");
    const [engine, setEngine] = useState("stock");
    const [orientation, setOrientation] = useState('white');
    const [moveNumber, setMoveNumber] = useState(0);
    const [position, setPosition] = useState('start');
    const [gameState, setGameState] = useState("menu");
    const [backStory, setBackStory] = useState("Jenny is a beginner chess player. She is learning the game and is not very good at it yet. She is a good sport and enjoys playing with friends.");
    const [moveClue, setMoveClue] = useState("~");
    const [deleteMode, setDeleteMode] = useState(false);
    const [players, setPlayers] = useState(jplayers);

    function newGame(orientation) {
        setOrientation(orientation);
    }

    function onRestart() {
        console.log("restart");
        game.reset();
        setPosition(game.fen());
    }

    return (
        <GameContext.Provider value={{ players, setPlayers, backStory, setBackStory, moveClue, setMoveClue, newGame, playSound, game, gameState, setGameState, restart: onRestart, position, setPosition, skillLevel, setSkillLevel, avatar, setAvatar, engine, setEngine, orientation, setOrientation, moveNumber, setMoveNumber, setDeleteMode, deleteMode }}>
            {props.children}
        </GameContext.Provider>
    )
}

console.log("Create Context");

const useChessContext = () => useContext(GameContext);



export { GameContext, ChessContextProvider, useChessContext };