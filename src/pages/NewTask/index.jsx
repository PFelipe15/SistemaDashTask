import React, { useState } from 'react';
import NavMenu from '../../components/Nav';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext'
import './newtask.css';
import { getAuth, updateProfile } from 'firebase/auth';
import NameToggle from '../../components/NameToggle';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebaseConection';

function NewTask() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [repo, setRepo] = useState('')
    const [tags, setTags] = useState(' ')
    const [status, setStatus] = useState('A Fazer')
    const [userGet, setUserGet] = useState('not implemented')

    const addTask = async () => {
        const tagsSplited = tags.split(' ')
        const taskCollectionRef = collection(db, 'tasks')
        const user = await addDoc(taskCollectionRef, { title: title, description: description, repositorio: repo, tags: tagsSplited, status: status, userGetting: userGet })
        console.log(user)
    }
    return (
        <div className='container-newTask'>
            <NavMenu />

            <div className="main-container">
                <div className="main">
                    <div className="main-header">
                        <NameToggle />

                    </div>

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
                </div>
            </div>


        </div>)
}

export default NewTask;