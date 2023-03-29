import React from 'react';
import NavMenu from '../../components/Nav';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext'
import './newtask.css';
import { getAuth, updateProfile } from 'firebase/auth';
import NameToggle from '../../components/NameToggle';
function NewTask() {


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
                            <label htmlFor="">*TITULO</label><input type="text" placeholder='   Ex: Mudança de layout grid para Flex' />

                            <label htmlFor="">DESCRIÇÃO</label><input type="text" />
                            <div className="createtask-inputInline">
                                <label htmlFor="">*REPOSITÓRIO</label> <input className='repo-style' type="text" placeholder='  Ex: https://github.com/PFelipe15/meuportifolio' />
                                <label htmlFor="">TAGS</label> <input type="text" placeholder='Ex: #HTML' />
                            </div>

                            <button>CRIAR TAREFA</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>)
}

export default NewTask;