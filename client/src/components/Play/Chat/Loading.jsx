import React, { useState } from 'react';

const Loading = ({ room_id }) => {

    const [copySuccess, setCopySuccess] = useState('');

    // your function to copy here

    const copyToClipBoard = async e => {
        try {
            await navigator.clipboard.writeText(room_id);
            setCopySuccess('Copied!');
        } catch (err) {
            try {
                e.preventDefault();
                e.clipboardData.setData('text/plain', room_id)
                setCopySuccess('Copied!');
            } catch (error) {
                setCopySuccess('Failed to copy!');
            }
        }
    };

    return (
        <div className='page-container'>
            <p className='sm:w-1/2 text-center'>
                Click Below to Copy Room Id and Share it with another player to join room
            </p>
            <div className='flex flex-col space-y-4'>
                <button
                    className='button'
                    onClick={copyToClipBoard}
                    id='loadingroom_id'>
                    {room_id}
                </button>
                {copySuccess ? <p className='info-bg text-green-500'>{copySuccess}</p> : null}
            </div>
        </div >
    )
}

export default Loading
