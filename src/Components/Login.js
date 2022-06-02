import React, { useContext } from 'react'
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import UserContext from '../Contexts/UserContext';
import styled from 'styled-components'
import Cadastro from './Cadastro';
import Planos from './Planos';
import Home from './Home';
import Logo from '../imagens/logo.png'


function Login() {
  const Contexto=useContext(UserContext);
  const navigate=useNavigate();
  const URL_LOGIN='https://mock-api.driven.com.br/api/v4/driven-plus/auth/login';



  //Variaveis de estado:
  const [carregando,setCarregando]=React.useState(false)
  //const [email, setEmail]= React.useState('');
  const[senha,setSenha]=React.useState('');

  const[loginUsuario,setLoginUsuario]=React.useState({
    email:"",
    password:""
})

function Enviar(e){
  e.preventDefault();
  setCarregando(true)
  
  const promise=axios.post(URL_LOGIN,loginUsuario)
  promise.then((response)=>{

      console.log(response.data)
      const dadosDaApi=response.data;
      const {token,membership}=dadosDaApi; //Desdestruturando para pegar Token e membership
    
      //Através da variável Contexto que recebe o UserCOntexto, podemos passar os valores
      //desejados da API para a variável, permitindo que os demais componentes tenham acesso a ela

 
      Contexto.setToken(token);
      Contexto.setDadosdoPlano(dadosDaApi);
      Contexto.setDadosEspecificosPlano(dadosDaApi.name);
      Contexto.setMembership(membership);

      //Armazenando Token e membership no LocalStorage
      localStorage.setItem('membership',membership);
      localStorage.setItem('token',token)

      
      //Condição que vai redirecionar o usuario para Home ou subscription:
      if(membership==null){
        navigate('/subscriptions');
      }
      if(membership!=null){
        navigate('/home');
      }

  })

  promise.catch((response)=>{
      alert('Opa, os dados não estão corretos, amigo :(')
      setCarregando(false)
  })
}


  return (
    <EstiloPaginaLogin>
    <img src={Logo} alt='logo'/>
    <form onSubmit={Enviar}>
        <input placeholder='email'  id="email" value={
            loginUsuario.email} onChange={(event)=>setLoginUsuario({...loginUsuario,email:event.target.value})} required type='email' />
        <input placeholder='senha' id="password" value={loginUsuario.password} onChange={(event)=>setLoginUsuario({...loginUsuario,password:event.target.value})} required type='text' />
        <button type='submit'>{carregando ? <ThreeDots color='#FFF' height='13px' width='51px'/>:<div>ENTRAR</div>}</button>           
         </form>

    <Link to="/sign-up">
        <p>Não tem uma conta? Cadastre-se!</p>
    </Link>
</EstiloPaginaLogin>
  )
}

export default Login




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
 

  img{
    
    object-fit:cover;
    margin-bottom: 100px;
  }
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