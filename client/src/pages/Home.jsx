import React, { useState, useContext } from 'react'
import { UserContext } from "../UserContext";
import { useHistory, Redirect } from "react-router-dom";
import serverURL from '../constant'
import { XMarkIcon } from '@heroicons/react/24/outline'
const axios = require('axios');

const Home = () => {
    const { user } = useContext(UserContext);
    const [room_id, setRoom_id] = useState('');
    const [error, setError] = useState('')

    const joinRoom = async (e) => {
        e.preventDefault();

        const options = {
            url: `http://${serverURL}/join_room`,
            method: 'POST',
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                room_id
            }
        };

        axios(options)
            .then(res => {
                console.log(res);
                if (res.data.err) {
                    setError(res.data.err);
                } else if (res.data.doc) {
                    browserHistory.push('/play/' + room_id)
                    console.log('bye');
                }
            });

    }

    //Programitically navigate Using React-Router-Dom
    const browserHistory = useHistory();

    //Function to call server and get new Room id 
    const genereateUniqueID = () => {
        axios.get(`http://${serverURL}/create_room`).then(res => {
            browserHistory.push('/play/' + res.data)
        })
    }

    if (user === null) {
        return <Redirect to="/nickname" />
    }

    return (
        <div className="page-container">
            <h3 className='text-gray-400 text-4xl'>
                Hi <span className='text-gray-100'>{user ? user.name : ''}</span> 😀
            </h3>
            <div className="text-red-500 info-bg" style={{ display: !error ? 'none' : 'flex' }} ><XMarkIcon className='w-5 h-5 text-red-600' /> {error}</div>

            <form onSubmit={joinRoom} className="flex flex-col justify-center items-center space-y-4">
                <input
                    type="text"
                    value={room_id}
                    onChange={e => { setError(''); setRoom_id(e.target.value) }}
                    className="input"
                    placeholder='Enter Room ID' />
                <button className="button">Join Room</button>
            </form>
            <div>OR</div>
            <button className="button" onClick={genereateUniqueID}>Create Room</button>
        </div>
    )
}

export default Home
