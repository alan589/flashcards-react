import './style.css'
import Card from '../../components/Card'
import { useContext, useEffect, useState } from 'react'
import Xp from '../../components/Xp'
import { UserContext } from '../../context/user'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import { signOut } from 'firebase/auth'

const Game = () => {

    const { cards, signOut } = useContext(UserContext)

    return (
        <>
            <nav id="container-topo">
            <   span className='titulo'>FlashCard Challenge</span>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/login" onClick={() => signOut()}>Logout</Link></li>
                    <li><Xp></Xp></li>
                </ul>
             </nav>
            <div id="container-cards">
                {cards.map((card => <Card content={card} />))}
            </div>
        </>
    )
}

export default Game