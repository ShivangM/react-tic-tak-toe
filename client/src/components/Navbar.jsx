import React from 'react'
// import logo from '../assets/tik-tac-toe.svg';
import { Link } from "react-router-dom";
import Logo from '../assets/tik-tac-toe';

const Navbar = () => {
    return (
        <div className="bg-gray-900">
            <Link to="/react">
                <div className="flex flex-col items-center space-y-3 py-8">
                    <div className="w-20">
                        <Logo />
                    </div>
                    <div className='text-4xl text-gray-300'>Tik-Tac-Toe</div>
                </div>
            </Link>
        </div>
    )
}

export default Navbar
