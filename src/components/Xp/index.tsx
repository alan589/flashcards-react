import { UserContext } from '../../context/user';
import './style.css'
import { createContext, useContext } from "react";

export default function Xp() {
    const { totalXp } = useContext(UserContext)

    const aplicarCor = () => {
        if(totalXp > 0 ){
            return 'xp xp-positivo'
        }
        else if(totalXp < 0){
            return 'xp xp-negativo'
        }
        else {
            return 'xp xp-neutro'
        }
    }
    return (
        <div className={aplicarCor()}
        >{totalXp}
            <span>xp</span>
        </div>
    )
}