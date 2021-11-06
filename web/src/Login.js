import React, { useState } from 'react';
import api from './servicos/api';
import'./formLogin.css';
import'./global.css';
import { useEffect } from 'react';
//import axios from 'axios';


 
function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    
    function validaEmail(){
        const formato = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return email !== "" && formato.test(email);
    }

    useEffect(()=>{
        var el = document.getElementById("root");
        el.style.height = "100%";
        },[]);
    async function verificaLogin(e){
        
        e.preventDefault();
        /*if(email.length==0)
            setMensagem("E-mail deve ser preenchido!");
        else if(!validaEmail())
            setMensagem("E-mail inválido!");
        else if(senha.length<5)
            setMensagem("Senha deve possuir pelo menos 5 caracteres!");
        else
            setMensagem("");*/

        const params = {
            email,
            senha
          };
        const response =  await api.get('/usuarios/pesquisa',{
            params
        }).then((resp)=>{
            if(resp.data!=null){
                window.location.replace("/cadastrar");
            }
            else
                setMensagem("Não foi possível encontrar sua conta!");
        });
        setEmail('');
        setSenha('');
    }

    return( 
        <div id="backgroundLogin">
        <div id="login">
            <main className="Info">
                <h1>Controle &nbsp;&nbsp;&nbsp;Eleitoral &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020</h1>
            </main>
            <aside id="form-content">
                <h2>Login</h2>
                <form  onSubmit={verificaLogin}>
                    {/*Email*/}
                    <label>E-mail <input type="text" name="email" value={email} onChange={e=> setEmail(e.target.value)}/></label>
                    {/*Senha*/}
                    <label>Senha <input type="password" name="senha" value={senha} onChange={e=> setSenha(e.target.value)}/></label>
                    <input id="bt_logar" type="submit" name="Logar" value="Logar"/>
                    
                </form>
                <div className="msg" name="mensagem">{
                    mensagem
                }</div>
            </aside>
        </div>
        </div>
    );
}
    

export default Login;