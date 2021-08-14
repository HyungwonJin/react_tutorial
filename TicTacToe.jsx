import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1],
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => { // 액션을 dispatch할 때 마다 reducer부분이 실행된다.
    switch (action.type) {
        case SET_WINNER:
            // state.winner = action.winner; 이렇게 직접 바꾸면 안됨
            return {
                ...state, // 얕은 복사를 하고
                winner: action.winner, // 바뀌는 부분만 수정
            };
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            }
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [['', '', ''], ['', '', ''], ['', '', '']],
                recentCell: [-1, -1],
            }
        }
        default:
            return state;
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }
        if (win) {
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            let all = true;
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                })
            })
            if (all) {
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]);


    const onClickTable = useCallback(() => {
        // 액션 개체
        dispatch({ type: SET_WINNER, winner: "O" });
        //dispatch하면 액션을 실행한다. -> reducer
    }, []);

    return (

        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {state.winner && <div>{winner}님의 승리</div>}
        </>
    )
};

export default TicTacToe;