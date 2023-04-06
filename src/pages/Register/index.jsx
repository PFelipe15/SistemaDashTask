import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import './register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eyeOff from '../../assets/eye-off.svg'
import eyeOff2 from '../../assets/eye-off2.svg'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebaseConection';

function Register() {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');
    const navigate = useNavigate()
    async function handleRegister() {
        if (!email || !password || !passwordConfirmed) {
            return toast.warning("Dados não informados!");
        }

        else if (password != passwordConfirmed) {
            return toast.warning("Senhas não conferem!");
        }

        let register = await createUserWithEmailAndPassword(email, password)
        
        if (register) {
            toast.success("Usuario Criado! Seja Bem Vindo!")
            setTimeout(() => {
           return     navigate('/home', {})
            }, 1000)

        }
         
        if (error.code === 'auth/email-already-in-use') {
             return toast.error("Usuário já existe!")
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
                        <p>Faça seu registro!</p>

                        <div class="form-input">
                            <label class="label-input" for="">E-mail</label>
                            <input type="email" name="email" id="idEmail" class="input-text"
                                placeholder="Digite seu e-mail" value={email}
                                onChange={(e) => setEmail(e.target.value)} >
                            </input>
                            <label for="" class="show">Digite um e-mail válido</label>
                            <div class="password-input-top">
                                <label for="" class="label-input">Senha</label>
                            </div>
                            <div class="input-password">
                                <input type="password" name="senha" id="idSenha " class="input-text passwordEye"
                                    placeholder="Digite sua senha" value={password}
                                    onChange={(e) => setPassword(e.target.value)}>

                                </input>


                                <img src={eyeOff} class="fa-solid fa-eye-slash eye-none" onClick={() => { heandleEyeToClose() }} />
                                <img src={eyeOff2} class="fa-solid fa-eye eye-open" onClick={() => { heandleEyeToOpen() }} />

                            </div>

                            <div class="password-input-top">
                                <label for="" class="label-input">Confirmar Senha*</label>
                            </div>
                            <div class="input-password">
                                <input type="password" name="senha" id="idSenha " class="input-text passwordEye"
                                    placeholder="Digite sua senha" value={passwordConfirmed}
                                    onChange={(e) => setPasswordConfirmed(e.target.value)}>

                                </input>



                            </div>

                            <button class="btnEntrar" onClick={() => {
                                handleRegister()
                            }}>Registrar</button>
                            <Link to={'/'}>Voltar para o Login </Link>
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
export default Register;