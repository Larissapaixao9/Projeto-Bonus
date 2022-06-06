import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../Contexts/UserContext';
import Estilo from '../Estilogenerico/Estilo';
import styled from 'styled-components'
import axios from 'axios'


export default function TelaConfirmaPedido({mostrarModal,setMostrarModal, preco, nome, valoresInput}) {
  const navigate=useNavigate();
  const URL_ASSINAR_PLANO='https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions';

  const PegarDadosUseContext=useContext(UserContext);
  const {config}=PegarDadosUseContext;
  const {setDadosdoPlano}=PegarDadosUseContext;

  function AssinarPlano(){
    const promise=axios.post(URL_ASSINAR_PLANO,valoresInput,config);
    promise.then(
      (response)=>{
        console.log('Funcionou a assinatura')
        setDadosdoPlano(response.data)
        navigate('/home')
      }
    )
  
    promise.catch(
      ()=>{
        console.log('nao foi a assinatura')
        alert('Não conseguimos realizar a assinatura. Tente mais tarde')
      }
    )
  }


  return (
    <ModalBackground>
    <ModalContainer>
      <BotaoFechar onClick={()=>setMostrarModal(false)}>X</BotaoFechar>
      <div className='ModalTexto'>
        <p>Tem certeza que deseja assinar o plano {nome} (R$ {preco})? </p>
      </div>
      <ModalRodape>
        <BotaoNao onClick={()=>setMostrarModal(false)}>NÃO</BotaoNao>
        <BotaoSim onClick={AssinarPlano}>SIM</BotaoSim>
      </ModalRodape>
    </ModalContainer>
  </ModalBackground>
  )
}

export const ModalBackground=styled.div`
width: 100vw;
height: 100vh;

position: fixed;
display: flex;
justify-content: center;
align-items: center;

  p{
    color:black;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
  }
`
export const ModalContainer=styled.div`
width: 250px;

border-radius: 12px;
background-color: white;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
display: flex;
flex-direction: column;
padding: 25px;

`
export const BotaoFechar=styled.button`
position:fixed;
right:0;
top:0;
margin: 20px 20px;
background:#FFF;
cursor:pointer;
`

export const BotaoSim=styled.button`
width: 299px;
height: 52px;
border-radius: 8px;
margin: 20px 20px;
background:#FF4791;
color:#FFF;
cursor:pointer;
font-family: 'Roboto', sans-serif;
font-weight: 400;

`

export const BotaoNao=styled.button`
width: 299px;
height: 52px;
border-radius: 8px;
margin: 20px 20px;
background:#CECECE;
color:#FFF;
cursor:pointer;
font-family: 'Roboto', sans-serif;
font-weight: 400;
`
const ModalRodape=styled.div`
  display:flex;
  
`