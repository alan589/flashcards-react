import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/user'

const Login = () => {

    const { user, signIn, loading, signUp } = useContext(UserContext)
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")

    useEffect(() => {
        if (user) navigate("/dashboard")
    }, [user])

    if (loading) {
        return <p>carregando ...</p>
    }

    return (
        <>
            <div className="container">
                <div className='login-wrapper'>
                    <div>
                        <div className='input-wrapper'>
                            <label htmlFor="user">Usuário</label>
                            <input type="email" id="user" required
                            onChange={(e) => { setUsuario(e.target.value) }}
                            />
                        </div>
                        <div className='input-wrapper'>
                            <label htmlFor="user">Password</label>
                            <input type="password" id="password" required
                            onChange={(e) => { setSenha(e.target.value) }}
                            />
                        </div>
                        <div>
                            <button 
                            onClick={() => signIn(usuario, senha)}
                            className='btn'>
                                Login
                            </button>

                            <button 
                            className='btn'
                            onClick={() => signUp(usuario, senha)}
                            > 
                                Virar membro
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Login