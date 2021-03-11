import { checkWinner, isWinner } from './gameHelper';

describe("checkWinner function", () => {
    it("returns false if 0 moves made", () => {
        const player = 'X';
        const board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
            ]
        expect(checkWinner(player, board)).toEqual(false);
    });
    it("returns false if 2 'X' moves have been made", () => {
        const player = 'X';
        const board = [
            ['X', '', ''],
            ['', 'X', ''],
            ['', '', '']
        ]
        expect(checkWinner(player, board)).toEqual(false);
    });
    it("returns false if 2 'O' moves have been made", () => {
        const player = 'O';
        const board = [
            ['', 'O', ''],
            ['', '', ''],
            ['', '', 'O']
        ]
        expect(checkWinner(player, board)).toEqual(false);
    });
    it("returns false if 2 'O' moves have been made and board has moves from both players", () => {
        const player = 'O';
        const board = [
            ['', 'O', ''],
            ['X', '', ''],
            ['X', 'X', 'O']
        ]
        expect(checkWinner(player, board)).toEqual(false);
    });
    it("returns true if 3 'O' moves have been made", () => {
        const player = 'O';
        const board = [
            ['', 'O', ''],
            ['', '', 'O'],
            ['', '', 'O']
        ]
        expect(checkWinner(player, board)).toEqual(true);
    });
    it("returns true if 3 'X' moves have been made", () => {
        const player = 'X';
        const board = [
            ['', 'X', ''],
            ['X', '', ''],
            ['X', '', '']
        ]
        expect(checkWinner(player, board)).toEqual(true);
    }); 
    it("returns true if 3 'X' moves have been made when moves by other players have been made", () => {
        const player = 'X';
        const board = [
            ['', 'X', 'O'],
            ['X', 'O', 'O'],
            ['X', '', 'O']
        ]
        expect(checkWinner(player, board)).toEqual(true);
    });   
});


describe("isWinner Function", () => {
    it("returns false for a loss of 2 Xs in row 0", () => {
        const row = 0;
        const col = 1;
        const player = 'X'
        const board = [
            ['X', 'X', ''],
            ['O', 'O', ''],
            ['X', 'O', '']
        ]
        expect(isWinner(row, col, player, board)).toEqual(false);;
    });
    it("returns true for a row 0 win of Xs", () => {
        const row = 0;
        const col = 1;
        const player = 'X'
        const board = [
            ['X', 'X', 'X'],
            ['O', 'O', ''],
            ['X', 'O', '']
        ]
        expect(isWinner(row, col, player, board)).toEqual(true);;
    });
    it("returns true for a row 1 win of Xs", () => {
        const row = 1;
        const col = 2;
        const player = 'X'
        const board = [
            ['X', 'O', 'X'],
            ['X', 'X', 'X'],
            ['O', 'O', '']
        ]
        expect(isWinner(row, col, player, board)).toEqual(true);;
    });
    it("returns true for a row 2 win of Xs", () => {
        const row = 2;
        const col = 0;
        const player = 'X'
        const board = [
            ['X', 'O', ''],
            ['O', 'O', ''],
            ['X', 'X', 'X']
        ]
        expect(isWinner(row, col, player, board)).toEqual(true);;
    });
    it("returns true for a col 0 win of Xs", () => {
        const row = 2;
        const col = 0;
        const player = 'X'
        const board = [
            ['X', 'O', 'O'],
            ['X', '', ''],
            ['X', 'O', 'X']
        ]
        expect(isWinner(row, col, player, board)).toEqual(true);;
    });
    it("returns true for a col 1 win of Xs", () => {
        const row = 0;
        const col = 1;
        const player = 'X'
        const board = [
            ['X', 'X', 'O'],
            ['O', 'X', ''],
            ['X', 'X', '']
        ]
        expect(isWinner(row, col, player, board)).toEqual(true);;
    });
    it("returns true for a col 2 win of Xs", () => {
        const row = 1;
        const col = 2;
        const player = 'X'
        const board = [
            ['X', '', 'X'],
            ['O', 'O', 'X'],
            ['X', '', 'X']
        ]
        expect(isWinner(row, col, player, board)).toEqual(true);;
    });
    it("returns true for a diagonal win of Xs positioned in backslash spots", () => {
        const row = 1;
        const col = 1;
        const player = 'X'
        const board = [
            ['X', '', 'O'],
            ['O', 'X', 'O'],
            ['X', '', 'X']
        ]
        expect(isWinner(row, col, player, board)).toEqual(true);;
    });
    it("returns true for a diagonal win of Xs positioned in forwardslash spots", () => {
        const row = 1;
        const col = 1;
        const player = 'X'
        const board = [
            ['X', '', 'X'],
            ['O', 'X', 'O'],
            ['X', '', 'O']
        ]
        expect(isWinner(row, col, player, board)).toEqual(true);;
    });
});