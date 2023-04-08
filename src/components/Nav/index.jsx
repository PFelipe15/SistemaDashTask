import React, { useEffect, useState } from 'react';
import './nav.css';
import { BiUserCircle, BiLogOut } from 'react-icons/bi';

import tablet from '../../assets/Nav/tablet-portrait.svg'
import people from '../../assets/Nav/people.svg'
import cog from '../../assets/Nav/cog.svg'
import perfil from '../../assets/perfil.jpg'
import { TiThMenu } from 'react-icons/ti'
import documentIcon from '../../assets/document.svg'
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConection';

function NavMenu() {
    const [perfilUrl, setPerfilUrl] = useState('')
    const [perfilPhoto, setPerfilPhoto] = useState('')
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

    const handlePerfilPhoto = async () => {

        const apiUrl = `https://api.github.com/users/${perfilUrl}`;
        try {
            const response = await fetch(apiUrl);
            const userJson = await response.json();

            const auth = getAuth();
            updateProfile(auth.currentUser, {
                photoURL: userJson.avatar_url
            }).then(() => {
                toast.success("Foto Atualizada")
            }).catch((error) => {
                toast.error("Erro ao atualizar foto de perfil")
                console.log(error)
            });
        } catch (error) {
            console.error(error);

        }


        let perfilRef = document.querySelector('.menu-perfil')
        let moddalRef = document.querySelector('.moddalPefilLink')
        perfilRef.style.display = 'flex'
        moddalRef.style.display = 'none'


    }


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setPerfilPhoto(user.photoURL);
            }
        });



        return unsubscribe;


    }, [])

    return (
        <div className="menu">
            <div className="menu-header">
                <div className="menu-perfil">

                    <img src={perfilPhoto || perfil} alt="teste" id="perfilId" />

                    <button id='btnModdal' onClick={() => {
                        showPefilModdal()
                    }}> <BiUserCircle size={30} color="#ffffff" /> </button>
                    <div className="loggout">
                        <button onClick={logout} >  <BiLogOut size={30} color="#ffffff" />  Sair </button>
                    </div>
                </div>


                <div className="moddalPefilLink">
                    <span>Digite o nome do seu perfil no github!</span>
                    <input value={perfilUrl} onChange={(e) => { setPerfilUrl(e.target.value) }} type="text" />
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
        </div>


    );
}

export default NavMenu;