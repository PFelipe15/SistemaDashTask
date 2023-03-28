import React, { useEffect, useState } from 'react';
import './nav.css';
import Vector from '../../assets/Vector.svg'
import tablet from '../../assets/Nav/tablet-portrait.svg'
import people from '../../assets/Nav/people.svg'
import cog from '../../assets/Nav/cog.svg'
import perfil from '../../assets/perfil.png'
import Document from '../../assets/Nav/document-text.svg'
import { getAuth, updateProfile } from 'firebase/auth';
function NavMenu() {
    const [photoUser, setPhotoUser] = useState( );
    function handlePhotoUser() {
        alert("teste")
        const auth = getAuth();
        const profilephoto = prompt("Onde esta a foto")
        updateProfile(auth.currentUser, {
            photoURL: profilephoto
        }).then(() => {
            console.log("Sucess")
            setPhotoUser(profilephoto)
        }).catch((error) => {
            console.log("ERROR: " + error)
        });
    }

    useEffect(() => {


        return () => {
        }
    }, [photoUser])

    return (
        <div className="menu">

            <img id='perfilId' src={photoUser} alt="" />
            <button onClick={() => {
                handlePhotoUser()
            }}>
                <img src={cog} alt="" />
            </button>
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

        </div>);
}

export default NavMenu;