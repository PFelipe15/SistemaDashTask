import React, { useEffect, useState } from 'react';
import './nav.css';
import Vector from '../../assets/Vector.svg'
import tablet from '../../assets/Nav/tablet-portrait.svg'
import people from '../../assets/Nav/people.svg'
import cog from '../../assets/Nav/cog.svg'
import perfil from '../../assets/perfil.png'
import loggout from '../../assets/loggout.svg'
import { ToastContainer, toast } from 'react-toastify';
import Document from '../../assets/Nav/document-text.svg'
import { getAuth } from 'firebase/auth';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConection';

function NavMenu() {
    const [signOut, loading, error] = useSignOut(auth);
    let navigate = useNavigate()

    const [selectedImage, setSelectedImage] = useState(getAuth().currentUser.photoURL);



    const logout = async () => {
        const success = await signOut();
        if (success) {
            toast.info("Deslogando...");
            setTimeout(() => {

                navigate('/')
            }, 1000)
        }


    }






    return (
        <div className="menu">

            <img src={perfil} alt="teste" id="perfilId" />

            <div className="loggout">

                <button onClick={logout} > <img src={loggout} alt="" /> Sair </button>
            </div>

            <div className="menu-nav">
                <ul>
                    <li className='toggleDesktop' ><button><img src={tablet} alt="" />Boards</button>  </li>
                    <li className='toggleDesktop'><button><img src={people} alt="" />Equipes</button></li>
                    <li className='toggleDesktop'><button><img src={cog} alt="" />Ajustes</button></li>
                    <li className='toggleMobile'><button><img src={tablet} alt="" /></button>  </li>
                    <li className='toggleMobile' ><button><img src={people} alt="" /></button></li>
                    <li className='toggleMobile'><button><img src={cog} alt="" /></button></li>

                </ul>
            </div>
            <ToastContainer />
        </div>);
}

export default NavMenu;