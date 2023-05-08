import { createContext, useEffect, useState } from "react"

import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as signOutFirebase,
} from 'firebase/auth';

const UserContext = createContext({})

const UserProvider = ({ children }) => {
    const auth = getAuth();
    const [couldLogin, setCouldLogin] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [totalXp, setTotalXp] = useState(0)

    useEffect(() => {
        return onAuthStateChanged(auth, listenAuth)
    }, [])

    const listenAuth = (userState: any) => {
        console.log('listenAuth', userState)
        setUser(auth.currentUser)
        setLoading(false)
    }



    const signIn = (email: string, password: string) => {
        console.log('xxx', email, password)
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {


        }).catch((error) => {
            console.log('error', error)
            alert('Usuário não encontrado. Vire membro clicando no botão "Virar membro"')
            setLoading(false)
        })

    }

    const signOut = (email: string, password: string) => {
        console.log('xxx', email, password)
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {


        }).catch((error) => {
            console.log('error', error)
            setLoading(false)
        })

        signOutFirebase(auth)

    }

    const signUp = (email: string, password: string) => {
        console.log('xxx', email, password)
        setLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            // ...
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
                alert('Erro ao criar a conta. Forneça um e-email correto')
            }
            setLoading(false)
            // ..
        });

    }

    const handleXp = (xp) => {
        setTotalXp(totalXp + xp)
    }

    return (
        <UserContext.Provider value={{ couldLogin, 
        signIn, 
        signUp, 
        signOut, 
        user, 
        loading, 
        handleXp, 
        totalXp,
        }}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }