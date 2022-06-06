import React, { useContext } from 'react'
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import UserContext from '../Contexts/UserContext';
import styled from 'styled-components'

export default function Planos() {
  
  const URL_PLANOS='https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships'
 
  const Contexto=useContext(UserContext);
  const token=localStorage.getItem('token');
  
  const[planos,setPlanos]=React.useState([]);
  React.useEffect(
    ()=>{
      const promise=axios.get(URL_PLANOS, 
        {
          headers: {
              "Authorization": `Bearer ${token}`
              }
          });
        
      promise.then((response)=>{
        console.log(response.data);
        setPlanos(response.data);
      })

      promise.catch(()=>{
        console.log('Deu ruim nos planos')
      })
    },[]
  )


  return (
   
    <EstiloPaginaEscolhaPlanos>
    <TextoEscolherPlano>Escolha seu Plano</TextoEscolherPlano>
    {planos.map((item,index)=>{
      const {id,image,price}=item; //Desestruturação

      return ( 
        <Link to={`/subscriptions/${id}`}>
        <ContainerImagemPreco>
        
        <img src={image}/>
      <Preco>R$ {price}</Preco>
    
    </ContainerImagemPreco>
    </Link> ) 
      
           
    
     
    })}

    </EstiloPaginaEscolhaPlanos>
  )
}


const EstiloPaginaEscolhaPlanos=styled.div`
*box-sizing:border-box;

  height: 100vh;
  background-color:#000;
  display:flex;
  flex-direction:column;
  margin:0 auto;

  p{
    color:#fff;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
  }
  div{
    height: 120px;
    width:80%;
    border:3px solid #7E7E7E;
    border-radius:12px;
 
    margin: 6px auto;
    padding:20px;
    cursor:pointer;
    text-decoration:none;
  }

`
const TextoEscolherPlano=styled.h1`
    text-align:center;
    color:#FFF;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
`
const Preco=styled.span`
    color:#FFF;
    position:fixed;
    right:10%;
    margin-top:40px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size:24px;
   
`
const ContainerImagemPreco=styled.div`


 
`
