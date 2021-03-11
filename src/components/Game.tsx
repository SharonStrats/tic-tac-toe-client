import { useState, useEffect } from 'react';
import './Game.css';
import { io } from 'socket.io-client';
import { checkWinner, isWinner } from '../helpers/gameHelper';
const ENDPOINT = "http://127.0.0.1:4001";
const socket = io(ENDPOINT);

// Could use interface of GameMoveData and WinnerNotificationData but I split them apart

//first player gets X and second player gets O.
const Game: React.FC = () => {
    const [whosup, setWhosup] = useState<string>('X');
    const [gameBoard, setGameBoard] = useState<string[][]>([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);

    const onClickButton = (event: any) => {
        const playerID = sessionStorage.getItem("playerSymbol");
        // only allow clicks to work for the player who has a turn
        if (playerID) {
            if (whosup.localeCompare(playerID) === 0) {
                const row = parseInt(event.target.id.substr(0,1));
                const col = parseInt(event.target.id.substr(1,1));
    
                const newGameBoard = gameBoard;
                newGameBoard[row][col] = whosup;
                setGameBoard(newGameBoard);

                socket.emit("nextMove", { whosup: (whosup.localeCompare('X') === 0) ? 'O' : 'X', gameBoard});
                if (checkWinner(whosup, gameBoard)) {
                    if (isWinner(row, col, whosup, gameBoard)) {
                        socket.emit("winner", { whosup, board: gameBoard})
                    }
                }
            }
        }
    }
    useEffect(() => {
        socket.on("yourSymbol", (playerSymbol: string) => {
            sessionStorage.setItem("playerSymbol", playerSymbol);
        });

        socket.on('nextPlayer', (data:any) => {
            setWhosup(data.whosup);
            setGameBoard(data.gameBoard);
            const playerSymbol = sessionStorage.getItem("playerSymbol");
            if (playerSymbol) {
                if (playerSymbol.localeCompare(data.whosup) === 0) {
                    window.alert("Your turn");
                }
            }

            socket.on("winnerNotification", (data: any) => {
                setGameBoard(data.board);  
                sessionStorage.removeItem("playerSymbol");
                window.alert(data.message);
            });
        });
    }, [whosup, gameBoard]);  

    return (
        <div className="gameBoard">
            <div className="row1">
                <div className="tictacbox" id="00" onClick={onClickButton}>{gameBoard[0][0]}</div>
                <div className="tictacbox" id="01" onClick={onClickButton}>{gameBoard[0][1]}</div>
                <div className="tictacbox" id="02" onClick={onClickButton}>{gameBoard[0][2]}</div>
            </div>
            <div className="row2">
                <div className="tictacbox" id="10" onClick={onClickButton}>{gameBoard[1][0]}</div>
                <div className="tictacbox" id="11" onClick={onClickButton}>{gameBoard[1][1]}</div>
                <div className="tictacbox" id="12" onClick={onClickButton}>{gameBoard[1][2]}</div>
            </div>
            <div className="row3">
                <div className="tictacbox" id="20" onClick={onClickButton}>{gameBoard[2][0]}</div>
                <div className="tictacbox" id="21" onClick={onClickButton}>{gameBoard[2][1]}</div>
                <div className="tictacbox" id="22" onClick={onClickButton}>{gameBoard[2][2]}</div>
            </div>
        </div>
    );
};

export default Game;