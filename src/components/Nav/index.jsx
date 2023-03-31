import React, { useEffect, useState } from 'react';
import './nav.css';
import { BiUserCircle, BiLogOut } from 'react-icons/bi';
import Vector from '../../assets/Vector.svg'
import tablet from '../../assets/Nav/tablet-portrait.svg'
import people from '../../assets/Nav/people.svg'
import cog from '../../assets/Nav/cog.svg'
import perfil from '../../assets/perfil.png'
import documentIcon from '../../assets/document.svg'
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
    const showPefilModdal = () => {
        let perfilRef = document.querySelector('.menu-perfil')
        let moddalRef = document.querySelector('.moddalPefilLink')
        perfilRef.style.display = 'none'
        moddalRef.style.display = 'flex'

    }
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

    const handlePerfilPhoto = () => {
        let perfilRef = document.querySelector('.menu-perfil')
        let moddalRef = document.querySelector('.moddalPefilLink')
        perfilRef.style.display = 'flex'
        moddalRef.style.display = 'none'
    }

    return (
        <div className="menu">
            <div className="menu-header">
                <div className="menu-perfil">
                    <img src={perfil} alt="teste" id="perfilId" />
                    <button id='btnModdal' onClick={() => {
                        showPefilModdal()
                    }}> <BiUserCircle size={30} color="#ffffff" /> </button>
                    <div className="loggout">
                        <button onClick={logout} >  <BiLogOut size={30} color="#ffffff" />  Sair </button>
                    </div>
                </div>


                <div className="moddalPefilLink">
                    <span>Digite o link do seu perfil no github!</span>
                    <input type="text" placeholder='https://github.com/perfil' />
                    <button onClick={() => {
                        handlePerfilPhoto()
                    }}>Atualizar Foto</button>
                </div>
            </div>


            <div className="menu-nav">


                <ul>
                    <li className='toggleDesktop' ><button onClick={() => { navigate('/Home') }} ><img src={tablet} alt="" />Boards</button>  </li>
                    <li className='toggleDesktop'><button><img src={people} alt="" />Equipes</button></li>
                    <li className='toggleDesktop'><button onClick={() => {
                        handletoNewTask()
                    }}><img src={documentIcon} alt="" />Tarefas</button></li>
                    <li className='toggleDesktop'><button><img src={cog} alt="" />Ajustes</button></li>
                    <li className='toggleMobile'><button onClick={() => { navigate('/Home') }}><img src={tablet} alt="" /></button>  </li>
                    <li className='toggleMobile' ><button><img src={people} alt="" /></button></li>
                    <li className='toggleMobile' ><button onClick={() => {
                        handletoNewTask()
                    }}><img src={documentIcon} alt="" /></button></li>
                    <li className='toggleMobile'><button><img src={cog} alt="" /></button></li>

                </ul>
                <span>Desenvolvido por Paulo Felipe</span>
            </div>

            <ToastContainer />
        </div>);
}

export default NavMenu;