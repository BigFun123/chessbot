import { useEffect, setState, useState, useMemo, useReducer, useContext } from "react";
import { GameContext, useChessContext } from "./context";
import CChessboard from "./ChessBoard";
import registerServiceWorker from "./registerServiceWorker";
import { BLACK } from "chess.js";


/*

stockfish.postMessage('setoption name Skill Level value 3');
stockfish.postMessage('setoption name Skill Level Maximum Error value 600');
stockfish.postMessage('setoption name Skill Level Probability value 128');
stockfish.postMessage('position fen ' + chess.fen());
stockfish.postMessage('go depth 10');

*/

let engine = new Worker("stockfish.js");
let time = { wtime: 3000, btime: 3000, winc: 1500, binc: 1500 };
let engineStatus = {};
let randomMoveCount = 0;
let maxSkill = 20;
let moves = []; // an array of 20 moves, true is random, false is best move





const StockFish = (props) => {

    const gameContext = useChessContext();
    const [position, setPosition] = useState(gameContext.position);

    useMemo(() => {
        console.log("Skill Level: " + gameContext.skillLevel);
        //uciCmd("setoption name Skill Level value " + gameContext.skillLevel);
        moves = [];
        // perfect grand master
        if (gameContext.skillLevel == 20) {
            for (let i = 0; i < 20; i++) {
                moves.push(false);
            }
        } else {
            for (let i = 0; i < 20; i++) {
                moves.push(i % gameContext.skillLevel ? false : true);
            }
        }
        console.log("Skill Level: " + gameContext.skillLevel);
    }, [gameContext, gameContext.skillLevel]);


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

                chooseMove(match[1], match[2], (match[3] ? match[3] : ""));

                //gameContext.game.move({ from: match[1], to: match[2], promotion: match[3] });
                setPosition(gameContext.game.fen());
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

    // calculate a probability of making a random move based on gameContext.skillLevel (0-20)
    // keep track of randomMoveCount
    // if skillLevel is 0, always make a random move
    // if skillLevel is 20, always make the best move
    // if skillLevel is 10, make a random move 50% of the time
    function chooseMove(from, to, promotion) {

        randomMoveCount++;
        if (randomMoveCount > 19) randomMoveCount = 0;
        //console.log(moves);

        gameContext.setMoveClue(moves[randomMoveCount] ? "💭" : "💡");

        if (moves[randomMoveCount]) {
            console.log("making random move", randomMoveCount);
            const possibleMoves = gameContext.game.moves()
            let randomIndex = Math.floor(Math.random() * possibleMoves.length)
            let move = possibleMoves[randomIndex];

            // if the bot is skill > 5, then don't easily make a move that is attacked
            if (gameContext.skillLevel >= 5) {
                const square = move.slice(-2);
                const attacked = gameContext.game.isAttacked(square, gameContext.game.turn() == "w" ? "b" : "w");                
                if (attacked) { // make another choice
                    console.log("attacked", square, "choosing better move for skill level", gameContext.skillLevel);
                    randomIndex = Math.floor(Math.random() * possibleMoves.length)
                    move = possibleMoves[randomIndex];
                }
            }


            gameContext.game.move(move);
            uciCmd("position fen " + gameContext.game.fen());
            return
        }
        console.log("making best move");
        gameContext.game.move({ from: from, to: to, promotion: promotion });
    }


    function uciCmd(cmd, which) {
        console.log("UCI: " + cmd);
        engine.postMessage(cmd);
    }

    function onEvent(e) {
        console.log(e);
    }

    async function makeBotMove() {
        uciCmd("position fen " + gameContext.game.fen());
        uciCmd("setoption name Skill Level value " + gameContext.skillLevel);
        //uciCmd("setoption name UCI_LimitStrength true");
        //uciCmd("setoption name UCI_Elo 1000");
        uciCmd("go movetime 1000");


        //uciCmd("go depth 15");
        //uciCmd("go wtime " + time.wtime + " btime " + time.btime + " winc " + time.winc + " binc " + time.binc);        
    }

    return (
        <div className="vsbot">
            <CChessboard nextMove={makeBotMove} position={position} />
        </div>
    )
}

export default StockFish;