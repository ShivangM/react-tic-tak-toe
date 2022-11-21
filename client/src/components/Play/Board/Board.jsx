import React, { useState, useContext, useEffect, useRef } from 'react';
import Sqaure from './Sqaure'
import { UserContext } from "../../../UserContext"
import calculateWinner from '../../../utils/calculateWinner';

const Board = ({ socket, room_id }) => {

	const { user } = useContext(UserContext);
	const [squares, setSquares] = useState(Array(9).fill(null))
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const xIsNext = useRef(true);
	const Chance = useRef(1);
	const Player = useRef('');

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = (Player.current === user.id) ? 'Winner' : 'Better Luck Next Time';
		// status = 'Better Luck Next Time:' +Player.current;
	} else {
		status = (Player.current !== user.id) ? 'Your Chance' : 'Opponent Chance';
	}

	useEffect(() => {
		socket.on('squareClickedReceived', click => {
			const i = click.i;
			squares[i] = xIsNext.current ? 'X' : 'O';
			xIsNext.current = !xIsNext.current;
			setSquares(squares);

			Player.current = click.user_id;

			if (Chance.current === 2) Chance.current = 1;
			if (Chance.current === -1) Chance.current = 2;
			console.log(squares);
			forceUpdate();
		})
	}, [squares, xIsNext, forceUpdate, socket])


	useEffect(() => {
		socket.on('playAgainReceived', () => {
			squares.fill(null);
			setSquares(squares)
			console.log(squares);
			Chance.current = 1;
			Player.current = '';
			forceUpdate();
		})
	}, [squares, forceUpdate, socket])


	const handleClick = (i) => {

		if (Chance.current === 2 || Chance.current === -1 || calculateWinner(squares) || squares[i]) {
			return;
		}

		// console.log('emitting');
		const click = {
			i,
			name: user.name,
			user_id: user.id,
			room_id
		};
		socket.emit('squareClicked', click);
		Chance.current = -1;
	}

	const PlayAgain = () => {
		socket.emit('playAgain', room_id);
	}

	const renderSquare = (i) => {
		return <Sqaure
			val={squares[i]}
			onClick={() => handleClick(i)}
		/>;
	}

	return (
		<div className='page-container h-fit'>
			<div className="text-center text-gray-100 text-2xl py-4">{status}</div>
			<div className='grid grid-cols-3 gap-4 w-full max-w-xs lg:max-w-none'>
				{
					squares.map((box, idx) => {
						return renderSquare(idx)
					})
				}
			</div>
			<button onClick={PlayAgain} className='button' >Play Again</button>
		</div>
	)
}

export default Board
