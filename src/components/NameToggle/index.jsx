import React, { useEffect } from 'react';
import buttonPen from '../../assets/Caneta.svg'
import buttonCheck from '../../assets/check.svg'
import './nametoggle.css';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa'
import { BsFillPencilFill } from 'react-icons/bs'
function NameToggle() {
    const { userName, setUserName, userId, setUserId, isAdmin, setIsAdmin } = useContext(UserContext)
    function habilityNameToggle() {
        let eltoggle = document.querySelector('.toggleNameInput')
        let elName = document.querySelector('#idName')
        let buttonPen = document.querySelector('#idButtonPen')

        if (eltoggle.style.display === 'flex') {
            eltoggle.style.display = 'none'
            elName.style.display = 'flex'
            buttonPen.style.display = 'flex'

        } else {
            eltoggle.style.display = 'flex'
            elName.style.display = 'none '
            buttonPen.style.display = 'none'
        }

    }
    async function getUser() {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: userName
        }).then(() => {
            toast.success("Seu nome de Usuário foi atualizado!")
        }).catch((error) => {
            toast.error("Erro ao atualizar Nome de usuário ")
        });

        let eltoggle = document.querySelector('.toggleNameInput')
        let elName = document.querySelector('#idName')
        let buttonPen = document.querySelector('#idButtonPen')
        eltoggle.style.display = 'none';
        elName.style.display = 'flex';
        buttonPen.style.display = 'flex'
    }


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName || 'Digite Seu Nome Aqui!');
                setUserId(user.uid)
                if (user.uid !== 'NybZqbYBOUXE2NpiRDOdAlA03vJ2') {
                    setIsAdmin(false)
                }
                else{
                    setIsAdmin(true)
                }
            }

            else {
                setUserName('Não encontrado');
            }
        });



        return unsubscribe;


    }, [])



    return (
        <div className="title-kaban">
            <h1 id='idName'>{userName || 'not found'}</h1>
            <div className="toggleNameInput">
                <input type="text" placeholder='Digite seu Nome!' value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                <button onClick={() => { getUser() }}> <FaCheckCircle size={30} color="var(--text-primarycolor)" /> </button>
            </div>

            <button id='idButtonPen' onClick={() => {
                habilityNameToggle()
            }}>

                <BsFillPencilFill size={30} color="var(--text-primarycolor)" />
            </button>

            <ToastContainer />
        </div>
    )
}

export default NameToggle;