import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../Contexts/UserContext';
import Estilo from '../Estilogenerico/Estilo';
import styled from 'styled-components'
import axios from 'axios'
import { BsPersonCircle } from "react-icons/bs";
import { getByTitle } from '@testing-library/react';
import profile from '../imagens/profile.png'

export default function Home() {
    const URL_DELETAR_PLANO='https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions'
    const navigate=useNavigate()
    const {dadosdoPlano, dadosEspecificosPlano, config}=useContext(UserContext);
    const {image,perks}=dadosdoPlano.membership;
    const {name}=dadosdoPlano

    function DeletarPlano(){
        const promise=axios.delete(URL_DELETAR_PLANO,config);
        
        promise.then((response)=>{
            navigate('/subscriptions');
        })
        promise.catch(()=>{
            console.log('não deletou')
        })
    }
  return (
    <PaginaHome>
        <Topo>
        <img src={image}/>
        <img src={profile} />
        </Topo>

        <TextoBoasVindas>
            Olá, {name}
        </TextoBoasVindas>

        <BotaoContainer>
           {perks.map((item)=>
          
          <LinkEstilo href={item.link}> <Botao>{item.title}</Botao></LinkEstilo>
           )}
        </BotaoContainer>

        <Rodape>
            <BotaoMudarPlano onClick={()=>{navigate('/subscriptions')}}>Mudar plano</BotaoMudarPlano>
            <BotaoCancelarPlano onClick={DeletarPlano}>Cancelar plano</BotaoCancelarPlano>
        </Rodape>

    </PaginaHome>
  )
}

export const PaginaHome=styled.div`
height: 100vh;
background-color:#000;
display:flex;
flex-direction:column;
margin:0 auto;
`
const Topo=styled.div`
    display:flex;
    justify-content: space-between;
    padding:25px;

    img:last-child{
        width:34px;
        height:34px;
    }
`

const TextoBoasVindas=styled.h3`
    text-align:center;
    color:#FFF;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;

`
const BotaoContainer=styled.div`
    display:flex;
    flex-direction:column;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;

`
const Botao=styled.button`
width: 85%;
height: 52px;
border-radius: 8px;
margin: 5px auto;
background:#FF4791;
cursor:pointer;
color:#FFF;
font-family: 'Roboto', sans-serif;
font-weight: 700;
    a{
        display:flex;
        flex-direction:column;
        justify-content:center;
        text-decoration:none;
        color:#FFF;
    }

`
const LinkEstilo=styled.a`
display:flex;
flex-direction:column;
justify-content:center;
text-decoration:none;
color:#FFF;
`

const Rodape=styled.div`
    position:fixed;
    bottom:10px;
    display:flex;
    flex-direction:column;
    justify-content: center;
    width:100%;
`
const BotaoMudarPlano=styled.div`
width:85%;
height: 52px;
border-radius: 8px;
background:#FF4791;
color:#FFF;
cursor:pointer;
text-align:center;
margin:5px auto;
font-family: 'Roboto', sans-serif;
font-weight: 700;
`
const BotaoCancelarPlano=styled.div`
width:85%;
height: 52px;
border-radius: 8px;
color:#FFF;
cursor:pointer;
background:#FF4747;
text-align:center;
margin:5px auto;
font-family: 'Roboto', sans-serif;
font-weight: 700;
`