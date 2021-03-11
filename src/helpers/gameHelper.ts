// check winner based on locatio of last move
export const checkWinner = (player: string, board: string[][]) => {
    return (board.flat().filter(mark => (mark.localeCompare(player) === 0)).length > 2);   
}

export const isWinner = (row: number, col: number, player: string, board: string[][]) => {

    // check row
    if ((board[row][0] === player) &&  (board[row][1] === player) && (board[row][2] === player)) {
        return true;
    }
    //check col
    if ((board[0][col] === player) &&  (board[1][col] === player) && (board[2][col] === player)) {
        return true;
    }
    // check diagonal
    if ((row === col) || (row === 0 && col === 2) || (row === 2 && col === 0)){
        if ((board[0][0] === player) && (board[1][1] === player) && (board[2][2] === player)) {
            return true;
        }
        if ((board[0][2] === player) && (board[1][1] === player) && (board[2][0] === player)) {
            return true;
        }
    }
    return false;
}