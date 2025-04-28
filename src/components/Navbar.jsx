import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="border-b-1 border-gray-300 py-4 shadow-sm">
        <div className="container">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center pl-16">
                    <Link to={"/"} className="flex items-center"> 
                            <img src="/assets/Logo.png" alt="logo" className="mx-2" />
                            <h1 className="text-xl font-bold">SIMS PPOB</h1>
                    </Link>
                </div>

                {/* Menu */}
                <div className="flex items-center gap-10 pr-16">
                    <Link to={"/topup"} >
                        Top Up
                    </Link>
                    <Link to={"/transaction"} >
                        Transaction
                    </Link>
                    <Link to={"/profile"} >
                        Akun
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar