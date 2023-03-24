import React, { useEffect, useState } from 'react';
import NavMenu from '../../components/Nav';
import Vector from '../../assets/Vector.svg'
import './home.css';
import Cards from '../../data/CardData';
function Home() {

    const [Afazer, setAfazer] = useState(Cards.filter((el) => el.Status === "A Fazer"))
    const [Fazendo, setFazendo] = useState()
    const [feito, setFeito] = useState()
    useEffect(() => {
        let handleLimit = () => {
            let p = document.querySelectorAll('.card p')
            const limit = 80
            console.log(p)
            for (let ps of p) {
                const aboveLimit = ps.innerHTML.length > limit
                const donstOrEmpty = aboveLimit ? '...' : ''
                ps.innerHTML = ps.innerHTML.substring(0, limit) + donstOrEmpty
            }
        }

        handleLimit()
    })

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
                                <div className="tags">
                                    {el.Tags.map((el) => (
                                        <small> {el}</small>
                                    ))}



                                </div>
                            </div>
                        ))}

                        <div className="card">
                            <h3>#boraCodar</h3>
                            <p>Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.</p>
                            <div className="tags">
                                <small>rocketseat</small>
                                <small>desafio</small>
                            </div>

                        </div>
                        <div className="card">
                            <h3>#boraCodar</h3>
                            <p>Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.</p>
                            <div className="tags">
                                <small>rocketseat</small>
                                <small>desafio</small>
                            </div>

                        </div>
                    </div>

                    <div className='container-card'>
                        <h1>Fazendo</h1>
                        <div className="card">
                            <h3>#boraCodar</h3>
                            <p>Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.</p>
                            <div className="tags">
                                <small>rocketseat</small>
                                <small>desafio</small>
                            </div>

                        </div>

                        <div className="card">
                            <h3>#boraCodar</h3>
                            <p>Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.</p>
                            <div className="tags">
                                <small>rocketseat</small>
                                <small>desafio</small>
                            </div>

                        </div>
                    </div>

                    <div className='container-card'>
                        <h1>Feito</h1>
                        <div className="card">
                            <h3>#boraCodar</h3>
                            <p >Irure exercitation minim anim tempor ut irure ut exercitation sunt. Tempor anim officia quis occaecat occaecat. Nisi enim veniam mollit fugiat. Voluptate non adipisicing id amet aliqua id voluptate. Voluptate magna anim et ipsum amet ut esse cupidatat incididunt pariatur fugiat dolor non. Elit cillum deserunt laborum tempor culpa cupidatat. Ea culpa Lorem incididunt ex do dolore id.Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.</p>
                            <div className="tags">
                                <small>rocketseat</small>
                                <small>desafio</small>
                            </div>

                        </div>

                        <div className="card">
                            <h3>#boraCodar</h3>
                            <p >Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.</p>
                            <div className="tags">
                                <small>rocketseat</small>
                                <small>desafio</small>
                            </div>

                        </div>
                    </div>


                </div>
            </div>


        </div>
    </div>;
}

export default Home;