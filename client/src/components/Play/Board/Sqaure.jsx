import React from 'react'

const Sqaure = ({ val, onClick }) => {
    return (
        <div onClick={onClick} className='bg-gray-500 h-20 w-20 flex items-center justify-center cursor-pointer'>
            <button className="text-center text-4xl">
                {val ? val : ''}
            </button>
        </div>
    )
}

export default Sqaure;
