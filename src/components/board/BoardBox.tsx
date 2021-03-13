import React from 'react';
import './BoardBox.css';
// need to define an enum directory
const BoardBox = (props: any) => {
    console.log("Board in board " +props.board);
    return (
        <div className="board-box" key={`${props.row}${props.col}`} id={`${props.row}${props.col}`} onClick={props.onClickButton}>{props.board[props.row][props.col]}</div>
    );
}

export default BoardBox;