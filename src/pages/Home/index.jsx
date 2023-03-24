import React, { useEffect, useState } from 'react';
import NavMenu from '../../components/Nav';
import Vector from '../../assets/Vector.svg'
import buttonSeta from '../../assets/SetaRight.svg'
import './home.css';
import Cards from '../../data/CardData';
import { ToastContainer, toast } from 'react-toastify';
function Home() {

    const [cards, setCards] = useState(Cards)
    const [Afazer, setAfazer] = useState(Cards.filter((el) => el.Status === "A Fazer"))
    const [Fazendo, setFazendo] = useState(Cards.filter((el) => el.Status === "Fazendo"))
    const [feito, setFeito] = useState(Cards.filter((el) => el.Status === "Feito"))

    function handleClickTask(id) {

        const task = cards.find((el) => el.id === id);
        const updatedTask = { ...task };
        updatedTask.Status = "Fazendo";
        const updatedCards = [...cards];
        const index = updatedCards.findIndex((el) => el.id === id);
        updatedCards[index] = updatedTask;
        setCards(updatedCards);



    }
    useEffect(() => {

        let handleLimit = () => {
            let p = document.querySelectorAll('.card p')
            const limit = 80
            for (let ps of p) {
                const aboveLimit = ps.innerHTML.length > limit
                const donstOrEmpty = aboveLimit ? '...' : ''
                ps.innerHTML = ps.innerHTML.substring(0, limit) + donstOrEmpty
            }
        }

        handleLimit()
    }, [cards])

    return <div className='container-home'>
        <NavMenu />

        <div className="main-container">
            <div className="main">
                <div className="main-header">
                    <div className="title-kaban">
                        <h1>Paulo Felipe</h1>
                    </div>

                </div>
                <div className="main-kanbans">
                    <div className='container-card'>
                        <h1>A fazer</h1>
                        {Afazer.map((el) => (
                            <div className="card">
                                <h3>{el.title}</h3>
                                <p>{el.Description}</p>
                                <div className="footer-card">
                                    <div className="tags">
                                        {el.Tags.map((el) => (
                                            <small> {el}</small>
                                        ))}




                                    </div>
                                    <button onClick={() => { handleClickTask(el.id) }}><img src={buttonSeta} alt="" /></button>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className='container-card'>
                        <h1>Fazendo</h1>
                        {Fazendo.map((el) => (
                            <div className="card">
                                <h3>{el.title}</h3>
                                <p>{el.Description}</p>
                                <div className="tags">
                                    {el.Tags.map((el) => (
                                        <small> {el}</small>
                                    ))}



                                </div>
                            </div>
                        ))}


                    </div>
                    <div className='container-card'>
                        <h1>Feito</h1>
                        {feito.map((el) => (
                            <div className="card">
                                <h3>{el.title}</h3>
                                <p>{el.Description}</p>
                                <div className="tags">
                                    {el.Tags.map((el) => (
                                        <small> {el}</small>
                                    ))}



                                </div>
                            </div>
                        ))}
                    </div>



                </div>
            </div>


        </div>
    </div>;
}

export default Home;