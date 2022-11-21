/*IMPORTS*/
import React, { useState, useContext, useEffect } from 'react'
import { useParams, Redirect } from "react-router-dom";
import io from 'socket.io-client'
import serverURL from "../constant";
import { UserContext } from "../UserContext"
import Board from '../components/Play/Board/Board';
import Chat from '../components/Play/Chat/Chat';
import Loading from '../components/Play/Chat/Loading';

let socket;
const Play = () => {

    const ENDPT = `http://${serverURL}/`
    //set global user
    const { user, setUser } = useContext(UserContext);
    //To Get Paramters from URL and display
    const { room_id } = useParams();

    const [socketHasBeenInitialized, setSocketHasBeenInitialized] = useState(false)
    const [playNow, setPlayNow] = useState(false);

    useEffect(() => {
        socket = io(ENDPT);
        setSocketHasBeenInitialized(true);
        //return to if user doesn not exist means someone cam here from illegal way 
        if (!user) {
            return;
        }
        //emit join user event to server with below parmas 
        socket.emit('join', room_id);
        console.log(user.name + " " + user.id + " " + room_id);

    }, [ENDPT])

    useEffect(() => {
        socket.on('youCanPLayNow', () => {
            // console.log('YouCanPLayNow');
            setPlayNow(true);
        })
    }, [])

    //No point in countinuing if user does not exist
    if (!user) {
        return <Redirect to='/login' />;
    }
    return (playNow && socketHasBeenInitialized) ? (
        <div className='flex flex-col lg:flex-row w-full justify-center items-center h-full'>
            <Board socket={socket} room_id={room_id ? room_id : ''} />
            <Chat socket={socket} room_id={room_id ? room_id : ''} />
        </div>
    ) : (
        <div><Loading room_id={room_id} /></div>
    )
}

export default Play
