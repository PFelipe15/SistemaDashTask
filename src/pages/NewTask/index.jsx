import React, { useEffect, useState } from 'react';
import NavMenu from '../../components/Nav';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext'
import './newtask.css';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import NameToggle from '../../components/NameToggle';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConection';
import { toast, ToastContainer } from 'react-toastify';

import { Navigate, useNavigate } from 'react-router-dom';

function NewTask() {
    let navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [repo, setRepo] = useState('')
    const [tags, setTags] = useState(' ')
    const [status, setStatus] = useState('A Fazer')
    const [userGet, setUserGet] = useState('not implemented')
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [showModdal, setShowModdal] = useState('')


    function showModal() {
        let modalRef = document.querySelector('dialog')
        modalRef.style.display = 'none'
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (!user || user.uid !== 'NybZqbYBOUXE2NpiRDOdAlA03vJ2') {
 
                let modalRef = document.querySelector('dialog')
                modalRef.style.display = 'flex'
                modalRef.showModal()
              
            }
            


        });




    }

    const addTask = async () => {
        const tagsSplited = tags.split(' ')
        const taskCollectionRef = collection(db, 'tasks')
        const createTask = await addDoc(taskCollectionRef, { title: title, description: description, repositorio: repo, tags: tagsSplited, status: status, userGetting: userGet })
        if (createTask) {
            toast.success("Tarefa Criada com Sucesso!")
        }
        else {
            toast.warning("Erro ao Criar Tarefa")
        }
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




        showModal()
        getDocument()
        handleLimit()

    }, [cards])


    return (
        <div className='container-newTask'>
            <NavMenu />
            <div className="main-container">
                <div className="main">

                    <div className="main-header">
                        <NameToggle />
                    </div>
                    <div className="container-tasksMain">

                        <dialog>
                            <h1>Você não é um administrador!</h1>
                            <p>Somente administradores podem criar novas tarefas.</p>
                            <button onClick={() => {
                                navigate('/home')
                            }} >Retornar a Home</button>
                        </dialog>

                        <div className="createtask-container">
                            <h1>Criar Tarefa</h1>
                            <div className="createtask-inputs">
                                <label htmlFor="">*TITULO</label><input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder='   Ex: Mudança de layout grid para Flex' />

                                <label htmlFor="">DESCRIÇÃO</label><input value={description} onChange={(e) => { setDescription(e.target.value) }} type="text" />
                                <div className="createtask-inputInline">
                                    <label htmlFor="">*REPOSITÓRIO</label> <input value={repo} onChange={(e) => { setRepo(e.target.value) }} className='repo-style' type="text" placeholder='  Ex: https://github.com/PFelipe15/meuportifolio' />
                                    <label htmlFor="">TAGS</label> <input value={tags} onChange={(e) => { setTags(e.target.value) }} type="text" placeholder='Ex: #HTML' />
                                </div>

                                <button onClick={addTask}>CRIAR TAREFA</button>
                            </div>

                        </div>
                        <div className="getLastTasks">
                            <div className='container-card'>
                                <h1>Ultimas Tarefas Adicionadas </h1>
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

                                            </div>
                                        </div>
                                    ))

                                }

                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>


        </div>)
}

export default NewTask;