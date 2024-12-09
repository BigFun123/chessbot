import React, { useContext, useEffect, useMemo, useState } from 'react';
import Chessboard from 'chessboardjsx';
import { GameContext } from './context';
import Avatar from './Avatar';
import ChessButton from './ChessButton';

//<Chessboard position="2R5/4bppk/1p1p3Q/5R1P/4P3/5P2/r4q1P/7K b - - 6 50"/>
//<Chessboard position={{ e5: 'wK', e4: 'wP', e7: 'bK' }} />

const CChessboard = (props) => {
    const gameContext = useContext(GameContext);
    const [position, setBoardPosition] = useState(gameContext.position);
    const [orientation, setOrientation] = useState(gameContext.orientation);

    useEffect(() => {
        console.log("position");
        setOrientation(gameContext.orientation);
        setBoardPosition(gameContext.position);
    }, [gameContext]);

    useEffect(() => {
        console.log("memo");
        if (gameContext.orientation === 'black') {
            setTimeout(() => {
                props.nextMove();
                setBoardPosition(gameContext.game.fen());
                //gameContext.playSound("", 500);
            }, 500);
        }
    }, [orientation]);


    const [state, setState] = useState({
        // square styles for active drop square
        dropSquareStyle: {},
        // custom square styles
        squareStyles: {
            "e3": { backgroundImage: "url(e2.jpg)" },
        },
        pieces: {
            wQ: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth + 10,
                        height: squareWidth + 20,
                        opacity: isDragging ? 0.95 : 1,
                        translate: isDragging ? "0px -25px" : "0px -25px",
                    }}
                    src="wq.png"
                    alt="wQ"
                />
            ),
            bQ: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth + 10,
                        height: squareWidth + 25,
                        opacity: isDragging ? 0.95 : 1,
                        translate: isDragging ? "0px -30px" : "0px -30px",
                    }}
                    src="bq.png"
                    alt="bQ"
                />
            ),
            wK: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth + 10,
                        height: squareWidth + 25,
                        opacity: isDragging ? 0.95 : 1,
                        translate: "0px -30px",
                    }}
                    src="wk.png"
                    alt="wK"
                />
            ),
            bK: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth + 15,
                        height: squareWidth + 20,
                        opacity: isDragging ? 0.95 : 1,
                        translate: isDragging ? "0px -28px" : "0px -28px",
                    }}
                    src="bk.png"
                    alt="bK"
                />
            ),
            wP: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth,
                        height: squareWidth + 15,
                        opacity: isDragging ? 0.95 : 1,
                        translate: isDragging ? "0px -15px" : "0px -18px",
                    }}
                    src="wp.png"
                    alt="wP"
                />
            ),
            bP: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth,
                        height: squareWidth + 15,
                        opacity: isDragging ? 0.95 : 1,
                        translate: isDragging ? "0px -15px" : "0px -20px",
                    }}
                    src="bp.png"
                    alt="bP"
                />
            ),
            wR: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth,
                        height: squareWidth + 15,
                        opacity: isDragging ? 0.95 : 1,
                        translate: isDragging ? "0px -25px" : "0px -25px",
                    }}
                    src="wr.png"
                    alt="wR"
                />
            ),
            bR: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth,
                        height: squareWidth + 15,
                        opacity: isDragging ? 0.95 : 1,
                        translate: isDragging ? "0px -25px" : "0px -25px",
                    }}
                    src="br.png"
                    alt="bR"
                />
            ),
            wN: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth + 10,
                        height: squareWidth + 20,
                        opacity: isDragging ? 0.95 : 1,
                        translate: isDragging ? "0px -25px" : "0px -25px",
                    }}
                    src="wn.png"
                    alt="wN"
                />
            ),
            bN: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth,
                        height: squareWidth + 10,
                        opacity: isDragging ? 0.95 : 1,
                        translate: isDragging ? "0px -20px" : "0px -20px",
                    }}
                    src="bn.png"
                    alt="bN"
                />
            ),
            wB: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth + 5,
                        height: squareWidth + 15,
                        opacity: isDragging ? 0.95 : 1,
                        translate: isDragging ? "0px -20px" : "0px -20px",
                    }}
                    src="wb.png"
                    alt="wB"
                />
            ),
            bB: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: squareWidth + 10,
                        height: squareWidth + 20,
                        opacity: 1,
                        translate: isDragging ? "0px -45px" : "0px -25px",
                    }}
                    src="bb.png"
                    alt="bB"
                />
            ),
        },

        // square with the currently clicked piece
        pieceSquare: "",
        // currently clicked square
        square: "",
        // array of past game moves
        history: []
    });

    function getHelpColor() {
        switch (+gameContext.skillLevel) {
            case 0:
                return "radial-gradient(circle, #aaffcc 32%, transparent 55%)";
            case 1:
                return "radial-gradient(circle, #aaffcc 32%, transparent 55%)";
            case 2:
                return "radial-gradient(circle, #44444466 21%, transparent 45%)";
            case 3:
                return "radial-gradient(circle, #44444455 5%, transparent 42%)";
            default:
                return ""
        }
    }


    function highlightSquare(sourceSquare, squaresToHighlight) {
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
            (a, c) => {
                return {
                    ...a,
                    ...{
                        [c]: {
                            background: getHelpColor(),
                            borderRadius: "0"
                        }
                    },
                    ...squareStyling({
                        history: state.history,
                        pieceSquare: state.pieceSquare
                    })
                };
            },
            {}
        );

        setState(({ squareStyles }) => ({
            squareStyles: { ...squareStyles, ...highlightStyles }
        }));
    };

    function removeHighlightSquare(square) {
        setState(({ pieceSquare, history }) => ({
            squareStyles: squareStyling({ pieceSquare, history })
        }));
    };


    function onMouseOverSquare(square) {

        let moves = gameContext.game.moves({
            square: square,
            verbose: true
        });

        if (moves.length === 0) return;

        let squares = [];
        for (let i = 0; i < moves.length; i++) {
            squares.push(moves[i].to);
        }

        highlightSquare(square, squares);
    }

    function onMouseOutSquare(square) {
        removeHighlightSquare(square)
    };

    async function onDrop({ sourceSquare, targetSquare }) {
        if (gameContext.skillLevel != 0) {
            try {
                let move = gameContext.game.move({
                    from: sourceSquare,
                    to: targetSquare,
                    promotion: "q"
                });

                if (move === null) return;
            } catch (error) {
                console.log(error);
                return;
            }
        } else {
            // move the piece on the board without validation
            const piece = gameContext.game.remove(sourceSquare);
            gameContext.game.put({ type: piece.type, color: piece.color }, targetSquare);
        }



        setBoardPosition(gameContext.game.fen());
        gameContext.playSound();


        //setState(({ history, pieceSquare }) => ({
        //  history: gameContext.game.history({ verbose: true }),
        //squareStyles: squareStyling({ pieceSquare, history })
        //}));

        //setState(({ squareStyles }) => ({
        //  squareStyles: squareStyles
        //}));

        //setTimeout(() => {
        await props.nextMove();
        //setBoardPosition(gameContext.game.fen());
        //}, 1);

    }

    function onReset() {
        setBoardPosition("start");
        gameContext.restart();
    }

    function onExit() {
        setBoardPosition("start");
        gameContext.setGameState("menu");
    }

    function onDragOverSquare(square) {

        setState(({ history }) => ({
            squareStyles: squareStyling({ history, pieceSquare: square })
        }));
    }

    function getViewportWidth() {
        let width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 60;
        return Math.min(width, 650);
    }

    function onClick(square) {
        if (gameContext.deleteMode) {
            const piece = gameContext.game.get(square);
            if (piece.type === "k") {
                gameContext.playSound("error");
                return;
            }
            gameContext.game.remove(square);
            setBoardPosition(gameContext.game.fen());
        }
    }

    return (
        <div className="chessboard">

            <div className='vContainer'>
                <Chessboard className='chessboard'
                    darkSquareStyle={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
                    lightSquareStyle={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
                    position={position}
                    showNotation={true}
                    dropOffBoard='trash'
                    onMouseOverSquare={onMouseOverSquare}
                    onMouseOutSquare={onMouseOutSquare}
                    onDragOverSquare={onDragOverSquare}
                    //onPieceClick={onClick}
                    onSquareClick={onClick}
                    onDrop={onDrop}
                    pieces={state.pieces}
                    boardStyle={{
                        borderRadius: "2px",
                        boxShadow: `0 15px 15px rgba(0, 0, 0, 0.75)`,
                        backgroundImage: "url(board3.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover"
                    }}
                    width={getViewportWidth()}
                    orientation={orientation}
                    squareStyles={state.squareStyles} />
                <div className='vContainer chesscomments'>
                    {gameContext.game.getComment()}
                    {gameContext.game.isGameOver() ? <h1>Game Over</h1> : null}
                    {gameContext.game.isAttacked() ? <h1>Attacked</h1> : null}
                    {gameContext.game.isCheck() && !gameContext.game.isCheckmate() ? <h1>Check</h1> : null}
                    {gameContext.game.isCheckmate() ? <h1>Checkmate</h1> : null}
                    {gameContext.game.isDraw() ? <h1>Draw</h1> : null}
                    {gameContext.game.isInThreefoldRepetition ? <h1>Threefold</h1> : null}
                    {gameContext.game.isInsufficientMaterial() ? <h1>Insufficient Material</h1> : null}
                    {gameContext.game.isStalemate() ? <h1>Stalemate</h1> : null}
                </div>
            </div>
        </div>
    );
}

const squareStyling = ({ pieceSquare, history }) => {
    if (!history) return {};
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;

    return {
        [pieceSquare]: { backgroundColor: "rgba(155, 255, 0, 0.1)" },
        ...(history.length && {
            [sourceSquare]: {
                backgroundColor: "rgba(155, 255, 0, 0.4)"
            }
        }),
        ...(history.length && {
            [targetSquare]: {
                backgroundColor: "rgba(155, 255, 0, 0.4)"
            }
        })
    };
};


export default CChessboard;