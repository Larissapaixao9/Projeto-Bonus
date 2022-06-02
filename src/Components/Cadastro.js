import React, { useContext } from 'react'
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import UserContext from '../Contexts/UserContext';
import styled from 'styled-components'
import Planos from './Planos';
import Home from './Home';

function Cadastro() {
  const navigate=useNavigate();
  const URL_CADASTRO='https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up';


    //Variaveis de estado:
  const [carregando,setCarregando]=React.useState(false);
  const [cadastroUsuario,setCadastroUsuario]=React.useState({
    email: "",
    name: "",
    cpf: "",
    password: ""
  })

  function Enviar(event){
    event.preventDefault()

        const promise=axios.post(URL_CADASTRO,cadastroUsuario,cadastroUsuario);
        promise.then((response)=>{
            console.log('funfou');
            navigate('/')
        })
        promise.catch((response)=>{
            alert('Não foi possível cadastrar. Tente mais tarde')
        })
  }




  return (
    <EstiloPaginaLogin>
    <form onSubmit={Enviar}>
        <input placeholder='Nome'  id="name" value={
            cadastroUsuario.name} onChange={(event)=>setCadastroUsuario({...cadastroUsuario,name:event.target.value})} required type='text' />
        <input placeholder='CPF' id="cpf" value={cadastroUsuario.cpf} onChange={(event)=>setCadastroUsuario({...cadastroUsuario,cpf:event.target.value})} required type='text' />
        <input placeholder='E-mail' id="email" value={cadastroUsuario.email} onChange={(event)=>setCadastroUsuario({...cadastroUsuario,email:event.target.value})} required type='text' />
        <input placeholder='Senha' id="password" value={cadastroUsuario.password} onChange={(event)=>setCadastroUsuario({...cadastroUsuario,password:event.target.value})} required type='text' />

        <button type='submit'>{carregando ? <ThreeDots color='#FFF' height='13px' width='51px'/>:<div>CADASTRAR</div>}</button>           
         </form>

    <Link to="/">
        <p>Já possuí uma conta? Entre</p>
    </Link>
</EstiloPaginaLogin>
  )
}

export default Cadastro


//Estilo:
const EstiloPaginaLogin=styled.div`
*box-sizing:border-box;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  width: 100vw;
  height: 100vh;
  background-color:Black;
  color:#fff;
 

  input{
    color: #666666;
    border: 1px solid #D5D5D5;
    height: 52px;
    width:90%;
    font-size:18px;
    margin-bottom:16px;
    border-radius:8px;
    background: #f2f2f2;
    align-items:center;

}
input::placeholder{
  color: #7E7E7E;
  font-size:16px;
  border-radius: 10px;
  line-height: 25px;
}
button{
  color:#fff;
  background: #FF4791;
  display:flex;
  align-items:center;
  border-radius: 8px;
  justify-content:center;
  width:80%;
  height: 52px;

}
a{
  color:#fff;
}
form{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
}

`