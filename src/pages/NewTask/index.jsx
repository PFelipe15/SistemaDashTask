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
                        <NameToggle/>

                    </div>
                </div>
            </div>


        </div>)
}

export default NewTask;