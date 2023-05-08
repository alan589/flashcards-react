import { useContext, useState } from 'react'
import './style.css'
import { UserContext } from '../../context/user'

export default function Card({ content }) {

    const [isOpened, setIsOpened] = useState(false)
    const { handleXp } = useContext(UserContext)
    return (
        <div
            className={isOpened ? "card card-opened" : "card"}
            onClick={() => {
                setIsOpened(!isOpened)
            }}
        >
            <div className="content">
                <div className="front"
                
                >
                    <span>{content.front}</span>
                </div>
               <div className="back"
               >
                    <div className='resposta-wrapper'>
                        <div>{content.back}</div>
                        <div className='resposta'>
                                <span>Lembrou?</span>
                                <span>
                                    <span className='resposta-sim' onClick={() => {
                                        handleXp(10);
                                        alert('Você ganhou 10 de xp')
                                        }}>sim</span>
                                    <span className='resposta-nao' onClick={() => {
                                        handleXp(-20);
                                        alert('Você perdeu 20 xp')
                                        }}>não</span>
                                </span>
                        </div>
                    </div>
               </div>
            </div>

            
        </div>
    )
}