import React from 'react'

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <div className='w-full flex'>
            <form onSubmit={sendMessage} className="flex px-4 w-full items-center">
                <input
                    type="text"
                    className="py-2 px-4 flex-1 outline-none"
                    placeholder="Type A Message"
                    value={message}
                    onChange={e => { setMessage(e.target.value) }}
                />
                <button type="submit" className='button text-white h-full rounded-l-none'>Send</button>
            </form>
        </div>
    )
}

export default Input
