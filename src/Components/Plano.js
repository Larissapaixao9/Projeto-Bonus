
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../Contexts/UserContext';
import styled from 'styled-components'


export default function Plano() {
  const token=localStorage.getItem('token');
  const {ID}=useParams();

  const dadosUsercontext = useContext(UserContext);
  const {config} = dadosUsercontext;
  const URL_PLANO_CLICADO=`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${ID}`
  console.log(config)
  React.useEffect(()=>{
    const promise=axios.get(URL_PLANO_CLICADO,config);

    promise.then((response)=>{
      console.log('funfou');
     
    })

    promise.catch(()=>{
      console.log('plano clicado não carregou ')
    })
  },[]);

  return (
    <EstiloPaginaPlanoClicado>
    <div>Plano Clicado</div>

    <form>
     <input type="text" placeholder='Nome impresso no cartão'  required/>
      <input type="number" placeholder='Dígitos do cartão' required/>
      <input type="number" placeholder='Código de segurança'  required/>
      <input type="text" placeholder='Validade (mm/aa)' required/>
      <button type="submit">ASSINAR</button>
    </form>
    </EstiloPaginaPlanoClicado>
  ) 
  
}

const EstiloPaginaPlanoClicado=styled.div`
*box-sizing:border-box;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  width: 100vw;
  height: 100vh;
  background-color:Black;
  color:#fff;

  form{
    input{
      width:80%;
      heigth:80%;
      border:1px solid #D5D5D5;
      margin-bottom:8px;
      font-size:20px;
      background:#FFF;
      border-radius:8px;
      margin-left:25px;
    }
    button {
      width: 80%;
      height: 52px;
      background: #FF4791;
      border-radius: 8px;
      border: 0;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      color: #FFFFFF;
      margin: 8px 0 25px 0;
      margin-left:25px;
  }
  }
`