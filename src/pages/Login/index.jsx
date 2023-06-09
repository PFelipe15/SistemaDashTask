import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignInWithEmailAndPassword, } from 'react-firebase-hooks/auth';
import './login.css';
import { auth } from '../../services/firebaseConection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eyeOff from '../../assets/eye-off.svg'
import eyeOff2 from '../../assets/eye-off2.svg'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserContext } from '../../context/userContext';
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
        signInWithEmailAndPassword(email, password)
        if (error) {
            return toast.error("Usuario não encontrado!")

        }

        if (loading) {
            toast.success("Bem Vindo!");
        }


        if (user) {
            toast.success("Bem Vindo")
            setTimeout(() => {

                navigate('/home')

            }, 1000)


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

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/home')




            }

        });


    }, [])

    return <div>
        <div class="container">
            <div class="container-form-login">
                <div class="form-login">
                    <div class="form">
                        <h1>Acesse a plataforma</h1>
                        <p>Faça login ou registre-se para começar a resolver e organizar suas tarefas!</p>

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


                                <img src={eyeOff} class="fa-solid fa-eye-slash eye-none" onClick={() => { heandleEyeToClose() }} />
                                <img src={eyeOff2} class="fa-solid fa-eye eye-open" onClick={() => { heandleEyeToOpen() }} />

                            </div>
                            <button class="btnEntrar" onClick={() => {
                                handleLogin()
                            }}>Entrar</button>
                            <ToastContainer />
                            <div class="box-footer">
                                <label for="">ainda não tem uma conta?</label><Link to={'/Register'} href="#">Inscreva-se</Link>

                            </div>
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