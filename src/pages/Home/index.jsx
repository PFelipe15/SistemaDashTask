import React, { useCallback, useEffect, useState } from 'react';
import NavMenu from '../../components/Nav';
import { FaArrowCircleRight, FaArrowCircleLeft, FaUserEdit } from 'react-icons/fa'
import './home.css';
import { ToastContainer, toast } from 'react-toastify'
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { app, db } from '../../services/firebaseConection';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Cards from '../../data/CardData'
import NameToggle from '../../components/NameToggle';

function Home() {
    console.log('Rederizou')
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { userName, userId, isAdmin } = useContext(UserContext)

    async function goToFazendoTask(id) {


        const taskRef = doc(db, "tasks", id);
        updateDoc(taskRef, {
            status: 'Fazendo',
            userGetting: userId,
            userGettingName: userName
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
    useEffect(() => {

        const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
            const lista = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                lista.push(data);
            });
            setCards(lista);
            setIsLoading(false);
        });
        return unsubscribe;



    }, [])

    return <div className='container-home'>
        <NavMenu />
        <div className="main-container">
            <div className="main">
                <div className="main-header">
                    <NameToggle />
                </div>

            </div>
            <div className="main-kanbans">
                <div className='container-card'>
                    <h1>A fazer  </h1>
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



                                        <button onClick={() => { goToFazendoTask(el.id) }}><FaArrowCircleRight color='var(--text-primarycolor)' size={'30px'} /> </button>
                                    </div>
                                </div>
                            </div>
                        ))

                    }

                </div>
                <div className='container-card'>
                    <div className="titleFilter-container">
                        <h1>Fazendo: </h1>
                        <h3>
                            {cards.filter((el) => el.status === "Fazendo" && el.userGetting === userId).length}
                        </h3>
                    </div>

                    {
                        isAdmin === true ?
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
                                            <button id='UserGetting'><FaUserEdit color='var(--text-primarycolor)' size={'30px'} /> {el.userGettingName}</button>

                                            <button type={'submit'} onClick={() => {
                                                goToFeitoTask(el.id)
                                            }} > <FaArrowCircleRight color='var(--text-primarycolor)' size={'30px'} /></button>
                                        </div>

                                    </div>
                                </div>
                            )) : isLoading || cards.filter((el) => el.status === "Fazendo").length == 0 ? (<p>Não há Tarefas Aqui!</p>) : cards.filter((el) => el.status === "Fazendo" && el.userGetting === userId).map((el) => (
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
                                            <button id='UserGetting'><FaUserEdit color='var(--text-primarycolor)' size={'30px'} /> {el.userGettingName}</button>

                                            <button type={'submit'} onClick={() => {
                                                goToFeitoTask(el.id)
                                            }} > <FaArrowCircleRight color='var(--text-primarycolor)' size={'30px'} /></button>
                                        </div>

                                    </div>
                                </div>
                            ))

                    }

                </div>

                <div className='container-card'>
                    <h1>Feito</h1>
                    {
                        isAdmin === true ?
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



                                            <button type={'submit'} onClick={() => { goToFazendoTask(el.id) }}> <FaArrowCircleLeft color='var(--text-primarycolor)' size={'30px'} /></button>
                                        </div>
                                    </div>
                                </div>
                            )) : isLoading ? (<p>Carregando</p>) : cards.filter((el) => el.status === "Feito" && el.userGetting === userId).map((el) => (
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



                                            <button type={'submit'} onClick={() => { goToFazendoTask(el.id) }}> <FaArrowCircleLeft color='var(--text-primarycolor)' size={'30px'} /></button>
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


}

export default Home;