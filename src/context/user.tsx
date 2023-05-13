import { createContext, useEffect, useState } from "react"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
} from 'firebase/auth';
import firebaseApp from "../services/firebase";


interface IUserContext {
        signIn : Function, 
        signUp : Function, 
        signOut : Function, 
        user: any, 
        loading : boolean, 
        handleXp : Function, 
        handleCards : Function,
        cards: any,
        totalXp: number,
}
const UserContext = createContext<IUserContext>({} as IUserContext)



interface IUserProvider {
    children : React.ReactNode
}
const UserProvider : React.FC<IUserProvider> = ({ children }) => {
    const auth = getAuth();
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [totalXp, setTotalXp] = useState<number>(0)
    const [cards, setCards] = useState<any>([])

    const db = getFirestore(firebaseApp)

    
    useEffect(() => {
        return onAuthStateChanged(auth, listenAuth)
    }, [])

    const listenAuth = (userState: any) => {
        // console.log('listenAuth', userState)
        setUser(auth.currentUser)
        // console.log('auth.currentUser', auth.currentUser)
        setLoading(false)
        
    }

    const signIn = (email: string, password: string) => {
        setLoading(true)
        
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            }).catch((error) => {
                console.log('error', error)
                alert('Usuário não encontrado. Vire membro clicando no botão "Virar membro"')
                setLoading(false)
            })

    }

    const signOut = (email: string, password: string) => {
        setLoading(true)

        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            }).catch((error) => {
                console.log('error', error)
                setLoading(false)
            })
    
        signOutFirebase(auth)




    }

    const signUp = (email: string, password: string) => {
        setLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            // ...
            await setDoc(doc(db, "usuarios", email), {cards: [], xp: 0});

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode)
            console.log(errorMessage)

            if(errorCode === 'auth/weak-password'){
                alert('Erro ao criar a conta. Senha deve ter no minímo 6 caracteres')
            }
            else if (errorCode === 'auth/email-already-in-use') {
                alert('Erro ao criar a conta. Já existe uma conta com esse e-mail')
            }
            else {
                alert('Erro ao criar a conta. Forneça um e-mail e senha correto')
            }
            setLoading(false)
            // ..
        });

    }

    const handleXp = (xp: any) => {
        setTotalXp(xp)
    }
    const handleCards = (cards: any) => {
        setCards(cards)
    }

    return (
        <UserContext.Provider value={{ 
        signIn, 
        signUp, 
        signOut, 
        user, 
        loading, 
        handleXp, 
        handleCards,
        cards,
        totalXp,
        }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }