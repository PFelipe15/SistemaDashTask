import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import './login.css';
import { auth } from '../../services/firebaseConection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    async function handleLogin() {
        if (!email || !password) {
           return toast.warning("Dados não informados!");
        }

        let login = await signInWithEmailAndPassword(email, password)
        if (login) {

            navigate("/home")
        }


        else {
            toast.error("Usuario não encontrado!");
        }
    }







    function heandleEyeToClose() {

        let eyeNone = document.querySelector('.eye-none')
        let eyeOpen = document.querySelector('.eye-open')
        eyeNone.style.visibility = 'hidden'
        eyeOpen.style.visibility = 'visible'
        document.querySelector('.passwordEye').type = "text"
    }
    function heandleEyeToOpen() {


        let eyeNone = document.querySelector('.eye-none')
        let eyeOpen = document.querySelector('.eye-open')
        eyeNone.style.visibility = 'visible'
        eyeOpen.style.visibility = 'hidden'
        document.querySelector('.passwordEye').type = "password"
    }

    return <div>
        <div class="container">
            <div class="container-form-login">
                <div class="form-login">
                    <div class="form">
                        <h1>Acesse a plataforma</h1>
                        <p>Faça login ou registre-se para começar a construir seus projetos ainda hoje.</p>

                        <div class="form-input">

                            <label class="label-input" for="">E-mail</label>
                            <input type="email" name="email" id="idEmail" class="input-text"
                                placeholder="Digite seu e-mail" value={email}
                                onChange={(e) => setEmail(e.target.value)} >
                            </input>
                            <label for="" class="show">Digite um e-mail válido</label>
                            <div class="password-input-top">
                                <label for="" class="label-input">Senha</label> <a href="#">Esqueceu a senha?</a>
                            </div>
                            <div class="input-password">
                                <input type="password" name="senha" id="idSenha " class="input-text passwordEye"
                                    placeholder="Digite sua senha" value={password}
                                    onChange={(e) => setPassword(e.target.value)}></input>


                                <img src='../src/assets/eye-off.svg' class="fa-solid fa-eye-slash eye-none" onClick={() => { heandleEyeToClose() }} />
                                <img src='../src/assets/eye-off2.svg' class="fa-solid fa-eye eye-open" onClick={() => { heandleEyeToOpen() }} />

                            </div>
                            <button class="btnEntrar" onClick={() => {
                                handleLogin()
                            }}>Entrar</button>
                            <ToastContainer />

                        </div>
                    </div>
                </div>

            </div>
            <div class="img-right">

            </div>
        </div>
    </div>
}

export default Login;