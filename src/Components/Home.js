import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../Contexts/UserContext';
import Estilo from '../Estilogenerico/Estilo';
import styled from 'styled-components'
import axios from 'axios'
import { BsPersonCircle } from "react-icons/bs";
import { getByTitle } from '@testing-library/react';

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
        <BsPersonCircle />
        </Topo>

        <TextoBoasVindas>
            Olá, {name}
        </TextoBoasVindas>

        <BotaoContainer>
           {perks.map((item)=>
               <Botao><a href={item.link}>{item.title}</a></Botao>
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
background-color:yellow;
`
const Topo=styled.div`
    display:flex;
    justify-content: space-between;
`

const TextoBoasVindas=styled.h3`
    text-align:center;

`
const BotaoContainer=styled.div`
    display:flex;
    flex-direction:column;

`
const Botao=styled.button`
width: 299px;
height: 52px;
border-radius: 8px;
margin: 20px 20px;
background:#FF4791;
cursor:pointer;
color:#FFF;
`

const Rodape=styled.div`
    position:fixed;
    bottom:0;
    left:50px;
    display:flex;
    flex-direction:column;
    justify-content: center;
`
const BotaoMudarPlano=styled.div`
width: 299px;
height: 52px;
border-radius: 8px;
background:#FF4791;
color:#FFF;
cursor:pointer;
text-align:center;
`
const BotaoCancelarPlano=styled.div`
width: 299px;
height: 52px;
border-radius: 8px;
color:#FFF;
cursor:pointer;
background:#FF4747;
margin-top:10px;
text-align:center;
`