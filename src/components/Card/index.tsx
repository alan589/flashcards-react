import { useContext, useEffect, useState } from 'react'
import './style.css'
import { UserContext } from '../../context/user'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import firebaseApp from '../../services/firebase'

interface Content {
    front: string,
    back: string
}
interface ICard {
    content: Content
}
const Card : React.FC<ICard> = ({content }) => {

    const db = getFirestore(firebaseApp)
    const [isOpened, setIsOpened] = useState(false)

    const { handleXp, totalXp, user } = useContext(UserContext)
    
    useEffect(() => {
        const atualizarXpDB = async () => {
            const usuarioRef = doc(db, "usuarios", user.email);
            await updateDoc(usuarioRef, {xp:totalXp});
        }

        atualizarXpDB()
    }, [totalXp])

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
                                <span>Acertou?</span>
                                <span>
                                    <span className='resposta-sim' onClick={() => {
                                        handleXp(totalXp + 10)
                                        alert('Você ganhou 10 de xp')
                                    }}>sim</span>
                                    <span className='resposta-nao' onClick={() => {
                                        handleXp(totalXp - 20)
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


export default Card