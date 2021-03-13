import { useState, useEffect } from 'react';
import './Game.css';
import Board from '../board/Board';
import { io } from 'socket.io-client';
//import { checkWinner, isWinner } from '../helpers/gameHelper';
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
               /* if (checkWinner(whosup, gameBoard)) {
                    if (isWinner(row, col, whosup, gameBoard)) {
                        socket.emit("winner", { whosup, board: gameBoard})
                    }
                } */
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

            socket.on("wait", (message) => {
                window.alert(message);
            });
        });
    }, [whosup, gameBoard]);  
    console.log("game board " + gameBoard);
    return (
        <Board numberOfRows={3} onClickButton={onClickButton} board={gameBoard}/>
    );
};

export default Game;