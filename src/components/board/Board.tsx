import React from 'react';
import BoardRow from './BoardRow';
import './Board.css';

const createRows = (onClickButton: () => void, numberOfRows: number, board: string[][]) => {
    var rows: JSX.Element[] = [];
    for (let i = 0; i < numberOfRows; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rows.push(<BoardRow key={i} numberOfRows={numberOfRows} onClickButton={onClickButton} board={board} row={i}/>);
    }
    return rows;
}

const createRowsJSX = (rows: JSX.Element[]) => {
    return rows.map(boardrow => {
        return boardrow
    })
}
const Board = (props: any) => {
    let rows = createRows(props.onClickButton, props.numberOfRows, props.board);
return (
    <div className="board">
        {createRowsJSX(rows)}
    </div>

    );
}
export default Board;