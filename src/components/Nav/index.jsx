import React from 'react';
import './nav.css';
import Vector from '../../assets/Vector.svg'
import tablet from '../../assets/Nav/tablet-portrait.svg'
import people from '../../assets/Nav/people.svg'
import cog from '../../assets/Nav/cog.svg'
import perfil from '../../assets/perfil.png'
import Document from '../../assets/Nav/document-text.svg'
function NavMenu() {
    return (
        <div className="menu">

            <img id='perfilId' src={perfil} alt="" />

            <div className="menu-nav">
                <ul>
                    <li><button><img src={tablet} alt="" />Boards</button>  </li>
                    <li><button><img src={people} alt="" />Equipes</button></li>
                    <li><button><img src={cog} alt="" />Ajustes</button></li>
                </ul>
            </div>
            
        </div>);
}

export default NavMenu;