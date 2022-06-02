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
    <h1>Escolha seu Plano</h1>
    {planos.map((item,index)=>{
      const {id,image,price}=item; //Desestruturação

      return  <div>
            <Link to={`/subscriptions/${id}`}>
            <img src={image}/>
          <span>{price}</span>
          </Link> 
        </div>
    
     
    })}

    </EstiloPaginaEscolhaPlanos>
  )
}


const EstiloPaginaEscolhaPlanos=styled.div`
*box-sizing:border-box;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  width: 100vw;
  height: 100vh;
  background-color:Black;
  color:#fff;

  h1{
    margin:0 auto;
  }
  p{
    color:#fff;
  }
  div{
    heigth:180px;
    width:80%;
    border:3px solid #7E7E7E;
    border-radius:12px;
    margin-bottom:20px;
    margin-top:20px;
    padding:10px;
    cursor:pointer;
    text-decoration:none;
  }
  span{
    text-align:center;
  }
  

`
