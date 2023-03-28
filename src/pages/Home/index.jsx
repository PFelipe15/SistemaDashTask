import React, { useEffect, useState } from 'react';
import NavMenu from '../../components/Nav';
import Vector from '../../assets/Vector.svg'
import buttonSeta from '../../assets/SetaRight.svg'
import buttonLeft from '../../assets/buttonleft.svg'
import buttonPen from '../../assets/Caneta.svg'
import buttonCheck from '../../assets/check.svg'
import max from '../../assets/max.svg'
import { getAuth, updateProfile } from "firebase/auth";
import './home.css';
import { ToastContainer, toast } from 'react-toastify'
import { collection, doc, setDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { app, db } from '../../services/firebaseConection';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext'
import { Tooltip } from 'react-tooltip'
import Cards from '../../data/CardData'

function Home() {


    const { isLogged, setIsLogged } = useContext(UserContext);
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState(getAuth().currentUser.displayName);
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
    async function goToFazendoTask(id) {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, {
            status: 'Fazendo'
        });
        toast.info("Você agora é o encarregado da Tarefa!")


    }
    async function goToFeitoTask(id) {
        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, {
            status: 'Feito'
        });
        toast.success("Você Realizou a tarefa!")


    }
    let handleLimit = () => {
        let p = document.querySelectorAll('.card p')
        const limit = 80
        for (let ps of p) {
            const aboveLimit = ps.innerHTML.length > limit
            const donstOrEmpty = aboveLimit ? '...' : ''
            ps.innerHTML = ps.innerHTML.substring(0, limit) + donstOrEmpty
        }
    }
    useEffect(() => {

        async function getDocument() {
            const lista = []
            const querySnapshot = await getDocs(collection(db, "tasks"));
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;

                lista.push(data);
                setCards(lista)
                setIsLoading(false)
            });

        }
        getDocument()
        handleLimit()



    }, [cards, userName])

    return <div className='container-home'>
        <NavMenu />

        <div className="main-container">
            <div className="main">
                <div className="main-header">
                    <div className="title-kaban">
                        <h1 id='idName'>{userName}</h1>
                        <div className="toggleNameInput">
                            <input type="text" placeholder='Digite seu Nome!' value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                            <button onClick={() => { getUser() }}><img src={buttonCheck} alt="" /></button>
                        </div>

                        <button id='idButtonPen' onClick={() => {
                            habilityNameToggle()
                        }}>

                            <img src={buttonPen} alt="" />
                        </button>


                    </div>




                </div>
                <div className="main-kanbans">
                    <div className='container-card'>
                        <h1>A fazer {isLogged}</h1>
                        {
                            isLoading || cards.filter((el) => el.status === "A Fazer").length == 0 ? (<p>Não há Tarefas Aqui!</p>) : cards.filter((el) => el.status === "A Fazer").map((el) => (
                                <div className="card">
                                    <h3>{el.title}</h3>
                                    <p>{el.description}</p>
                                    <div className="footer-card">
                                        <div className="tags">
                                            {el.tags?.map((el) => (
                                                <small> {el}</small>
                                            ))}
                                        </div>
                                        <div className="buttons-card">

                                            <button type={'submit'} onClick={() => { getUser() }}><img src={max} alt="" /></button>

                                            <button type={'submit'} onClick={() => { goToFazendoTask(el.id) }}><img src={buttonSeta} alt="" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))

                        }

                    </div>
                    <div className='container-card'>
                        <h1>Fazendo</h1>
                        {
                            isLoading || cards.filter((el) => el.status === "Fazendo").length == 0 ? (<p>Não há Tarefas Aqui!</p>) : cards.filter((el) => el.status === "Fazendo").map((el) => (
                                <div className="card">
                                    <h3>{el.title}</h3>
                                    <p>{el.description}</p>
                                    <div className="footer-card">
                                        <div className="tags">
                                            {el.tags?.map((el) => (
                                                <small> {el}</small>
                                            ))}
                                        </div>
                                        <div className="buttons-card">

                                            <button type={'submit'} onClick={() => { }}><img src={max} alt="" /></button>

                                            <button type={'submit'} onClick={() => { goToFeitoTask(el.id) }}><img src={buttonSeta} alt="" /></button>
                                        </div>

                                    </div>
                                </div>
                            ))

                        }

                    </div>

                    <div className='container-card'>
                        <h1>Feito</h1>
                        {
                            isLoading ? (<p>Carregando</p>) : cards.filter((el) => el.status === "Feito").map((el) => (
                                <div className="card">
                                    <h3>{el.title}</h3>
                                    <p>{el.description}</p>
                                    <div className="footer-card">
                                        <div className="tags">
                                            {el.tags?.map((el) => (
                                                <small> {el}</small>
                                            ))}
                                        </div>
                                        <div className="buttons-card">

                                            <button type={'submit'} onClick={() => { }}><img src={max} alt="" /></button>

                                            <button type={'submit'} onClick={() => { goToFazendoTask(el.id) }}><img src={buttonLeft} alt="" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))

                        }

                    </div>
                </div>


                <ToastContainer />

            </div>
        </div>
    </div >

}

export default Home;