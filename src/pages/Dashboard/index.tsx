import { Link } from 'react-router-dom'
import './style.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'

import firebaseApp from '../../services/firebase'

import { doc, getFirestore, addDoc, updateDoc, collection, getDocs, onSnapshot, query, setDoc, getDoc } from 'firebase/firestore'
import Xp from '../../components/Xp'

const Dashboard = () => {
    
    const db = getFirestore(firebaseApp)

    const { signOut, user, loading, totalXp, handleXp, handleCards, cards } = useContext(UserContext)
    const [front, setFront] = useState('')
    const [back, setBack] = useState('')
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        const getUsuariosDB = async () => {

            const querySnapshot = await getDocs(collection(db, "usuarios"));
             querySnapshot.forEach((doc) => {
             // doc.data() is never undefined for query doc snapshots
            //  console.log(doc.id, doc.data());

             const contaUsuario = {id: doc.id, dados: doc.data()}
             usuarios.push(contaUsuario)

             
            });
        }
        getUsuariosDB()
        console.log(usuarios)

    }, [])

    useEffect(() => {
        const getUsuarioDB = async () => {
            const docRef = doc(db, "usuarios", user.email);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                const {cards, xp} = docSnap.data();
                handleCards(cards)
                handleXp(xp)
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }

        getUsuarioDB();
          
    }, [])


    const handleAdd = async function () {
       
        cards.push({front: front, back: back})
          const usuario = {
              cards,
              xp: totalXp
          }
          const usuarioRef = doc(db, "usuarios", user.email);
          await updateDoc(usuarioRef, usuario);
          alert('Flashcard adicionado!')
       
    }

    if (loading) {
        return <div className='container'>
            <span>carregando ...</span>
        </div>
    }

    return (
        <>
            <nav id="container-topo">
                <span className='titulo'>FlashCard Challenge</span>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/login" onClick={() => signOut()}>Logout</Link></li>
                    <li><Xp></Xp></li>
                </ul>
            </nav>
        
            <div className='container-dashboard'>

                <div className='jogar'><Link to="/game">JOGAR!</Link></div>
                <div className='ranking'>
                    <h2>Ranking</h2>
                    {usuarios.map((u => <p>usuario: {u.id} xp: {u.dados.xp}</p>))}
                </div>
                <div className='cards'>
                    <input type="text" value={front} placeholder="front" onChange={(e) => { setFront(e.target.value) }} />
                    <input type="text" value={back} placeholder="back" onChange={(e) => { setBack(e.target.value) }} />
                    <button onClick={() => { 
                        handleAdd() 
                    }}>Adicionar</button>
                </div>
            </div>
        
        </>
    )
}

export default Dashboard