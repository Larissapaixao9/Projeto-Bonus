
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

  React.useEffect(()=>{
    const promise=axios.get(URL_PLANO_CLICADO,config);

    promise.then((response)=>{
      console.log('funfou');
     
    })

    promise.catch(()=>{
      console.log('plano clicado não carregou ')
    })
  },[]);

  return  <div>Plano Clicado</div>
  
}
