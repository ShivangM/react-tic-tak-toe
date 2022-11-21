import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const Messages = ({ Messages, user }) => {
    const Message = ({ message, user }) => {

        if (user.id === message.user_id) {
            return (
                <div className="self-start">
                    <div className="bg-yellow-600 rounded-tr-3xl">
                        <p className="px-4 py-2">
                            {message.name}: {message.text}
                        </p>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="self-end">
                    <div className="bg-rose-500 rounded-tl-3xl">
                        <p className="px-4 py-2">
                            {message.name}: {message.text}
                        </p>
                    </div>
                </div>
            )
        }

    }

    return (
        <div >
            {/* using package to scroll to the bottom as soon as new message arrrive */}
            <ScrollableFeed forceScroll={true} >
                <div className='flex flex-col space-y-4 max-h-96 overflow-y-scroll'>

                    {Messages.map((message, i) => {
                        return <Message key={i} message={message} user={user} />
                    })}
                </div>
            </ScrollableFeed>
        </div>
    )
}

export default Messages
