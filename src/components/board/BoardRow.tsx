import React from 'react';
import BoardBox from './BoardBox';

const createRow = (onClickButton: () => void, numberOfRows: number, board: string[][], row: number) => {
    var rows:JSX.Element[] = [];

    for (let i = 0; i < numberOfRows; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        
        rows.push(<BoardBox key={i} onClickButton={onClickButton} board={board} row={row} col={i}/>);
    }
    return rows;
}
const createRowJSX = (row: JSX.Element[]) => {
    return row.map(boardrow => {
        return boardrow
    })
}
const BoardRow = (props:any) => { 
   let row = createRow(props.onClickButton, props.numberOfRows, props.board, props.row);
    return (
    <div className="board-row">
        {createRowJSX(row)}
    </div>
)
};

export default BoardRow;