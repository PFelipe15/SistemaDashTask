import React, { useEffect, useState } from 'react';
import './nav.css';
import Vector from '../../assets/Vector.svg'
import tablet from '../../assets/Nav/tablet-portrait.svg'
import people from '../../assets/Nav/people.svg'
import cog from '../../assets/Nav/cog.svg'
import perfil from '../../assets/perfil.png'
import document from '../../assets/document.svg'
import loggout from '../../assets/loggout.svg'
import { ToastContainer, toast } from 'react-toastify';
import Document from '../../assets/Nav/document-text.svg'
import { getAuth } from 'firebase/auth';
import { useSignOut } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConection';

function NavMenu() {
    const [signOut, loading, error] = useSignOut(auth);
    let navigate = useNavigate()

    const logout = async () => {
        toast.info("Deslogando...");
        setTimeout(async () => {
            await signOut();
            navigate('/')
        }, 1000)
    }

    const handletoNewTask = () => {
        navigate('/NewTask')
    }



    return (
        <div className="menu">
            <div className="menu-header">
                <img src={perfil} alt="teste" id="perfilId" />

                <div className="loggout">

                    <button onClick={logout} > <img src={loggout} alt="" /> Sair </button>
                </div>
            </div>


            <div className="menu-nav">
                <ul>
                    <li className='toggleDesktop' ><button onClick={() => { navigate('/Home') }} ><img src={tablet} alt="" />Boards</button>  </li>
                    <li className='toggleDesktop'><button><img src={people} alt="" />Equipes</button></li>
                    <li className='toggleDesktop'><button onClick={() => {
                        handletoNewTask()
                    }}><img src={document} alt="" />Tarefas</button></li>
                    <li className='toggleDesktop'><button><img src={cog} alt="" />Ajustes</button></li>
                    <li className='toggleMobile'><button  onClick={() => { navigate('/Home') }}><img src={tablet} alt="" /></button>  </li>
                    <li className='toggleMobile' ><button><img src={people} alt="" /></button></li>
                    <li className='toggleMobile' ><button onClick={() => {
                        handletoNewTask()
                    }}><img src={document} alt="" /></button></li>
                    <li className='toggleMobile'><button><img src={cog} alt="" /></button></li>

                </ul>
                <span>Desenvolvido por Paulo Felipe</span>
            </div>
           
            <ToastContainer />
        </div>);
}

export default NavMenu;