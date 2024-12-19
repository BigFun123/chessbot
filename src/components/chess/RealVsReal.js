import { useEffect, setState, useState, useMemo, useReducer, useContext } from "react";
import { GameContext } from "./context";
import CChessboard from "./ChessBoard";
import ChessButton from "./ChessButton";
import ToggleButton from "./ToggleButton";
import openings from "./openings/openings.json";
import ChessButtonMini from "./ChessButtonMini";

let engine = new Worker("stockfish.js");
let time = { wtime: 3000, btime: 3000, winc: 1500, binc: 1500 };
let engineStatus = {};
let randomMoveCount = 0;
let maxSkill = 20;
let moves = []; // an array of 20 moves, true is random, false is best move

const RealVsReal = (props) => {

    const [showOpening, setShowOpening] = useState(false);

    function uciCmd(cmd, which) {
        console.log("UCI: " + cmd);
        engine.postMessage(cmd);
    }


    useEffect(() => {
        engine.onmessage = function (event) {
            let message = event.data;
            let match = message.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
            let info = message.match(/^info .*\bscore (\w+) (-?\d+)/);
            //console.log("UCI: " + message);
            if (message === "uciok") {
                engineStatus.engineLoaded = true;
            } else if (message === "readyok") {
                engineStatus.engineReady = true;
            } else if (match) {
                console.log("Match: " + match);
                console.log("Move: " + match[1] + match[2]);

                console.log("making best move");
                gameContext.game.move({ from: match[1], to: match[2], promotion: match[3] });
                //setPosition(gameContext.game.fen());
                gameContext.playSound("", 500);
                gameContext.setPosition(gameContext.game.fen());
                console.log("Message: " + message);
            }
            if (info) {
                //console.log("Info: " + info);
                let score = parseInt(info[2]) * (gameContext.game.turn() === 'w' ? 1 : -1);
                //console.log("Score: " + score);
            }
        };
        uciCmd("uci");
        uciCmd("isready");
        //uciCmd("setoption name Skill Level value " + gameContext.skillLevel);
        //setInterval(updateEngine, 3000);
    }, []);

    const gameContext = useContext(GameContext);


    async function makeBotMove() {
        uciCmd("position fen " + gameContext.game.fen());
        uciCmd("setoption name Skill Level value " + 5);
        //uciCmd("setoption name UCI_LimitStrength true");
        //uciCmd("setoption name UCI_Elo 1000");
        uciCmd("go movetime 1000");
    }


    function playWhiteFromHere() {
        console.log("play from here");
        //gameContext.setOrientation("white");
        const fen = gameContext.game.fen();
        const parts = fen.split(" ");
        parts[1] = "w";
        gameContext.game.load(parts.join(" "));
        gameContext.setPosition(gameContext.game.fen());
        makeBotMove();
    }
    function playBlackFromHere() {
        console.log("play from here");
        //gameContext.setOrientation("black");
        const fen = gameContext.game.fen();
        // force next move to black in fen string
        const parts = fen.split(" ");
        parts[1] = "b";
        gameContext.game.load(parts.join(" "));
        gameContext.setPosition(gameContext.game.fen());
        makeBotMove();
    }

    function reset() {
        gameContext.restart();
    }

    function deleteMode() {
        if (!gameContext.game.deleteMode) {
            const fen = gameContext.game.fen();
            console.log(fen);
            gameContext.setPosition(gameContext.game.fen());
        }
        gameContext.setDeleteMode(!gameContext.deleteMode);
    }

    const timer = ms => new Promise(res => setTimeout(res, ms))

    async function setOpening(move) {
        gameContext.setPosition(move.fen);

        // play each position in the game array
        for (let i = 0; i < move.game?.length; i++) {
            const themove = move.game[i];
            gameContext.setPosition(themove);
            gameContext.game.load(themove);            
            await timer(500);
            gameContext.playSound();
        };

    }

    return (
        <div className="vsbot">
            <div className="hContainer">
                <CChessboard nextMove={() => { }} />                
            </div>
            <div class="hContainer2">
                <ChessButton label="Play White" onClick={playWhiteFromHere}>Play White</ChessButton>
                <ChessButton label="Play Black" onClick={playBlackFromHere}>Play Black</ChessButton>
                <ToggleButton label="Delete" onClick={deleteMode}>X</ToggleButton>
            </div>
            <div class="hContainer2">
                <ToggleButton label="Openings" onClick={() => setShowOpening(!showOpening)}>Openings</ToggleButton>
                {showOpening &&
                    <div className="vContainer">
                        {openings.map((opening, index) => {
                            return <ChessButtonMini label={opening.name} onClick={() => setOpening(opening)}>{opening.name}</ChessButtonMini>
                        })}
                    </div>
                }
            </div>

        </div >
    )
}

export default RealVsReal;