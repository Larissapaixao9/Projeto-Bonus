
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../Contexts/UserContext';
import styled from 'styled-components'
import TelaConfirmaPedido from './TelaConfirmaPedido';
import { ArrowBackOutline } from 'react-ionicons'
import { Link, useNavigate } from "react-router-dom"
import { ClipboardOutline } from 'react-ionicons'
import prancheta from '../imagens/prancheta.png'
import dinheiro from '../imagens/dinheiro.png'
export default function Plano() {
  const token=localStorage.getItem('token');
  const {ID}=useParams();
  const membershipId=ID;

  const dadosUsercontext = useContext(UserContext);
  const {config} = dadosUsercontext;
  const URL_PLANO_CLICADO=`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${ID}`

  const [valoresInput, setValoresInput]=React.useState({
    membershipId,
    cardName:'',
    cardNumber:'',
    securityNumber:'',
    expirationDate:''
  })

  //variaveis de estado:
  const [dadosdaApi,setDadosdaApi]=React.useState("")
  const [dadosPerks,setDadosPerks]=React.useState([])
  const [mostrarModal,setMostrarModal]=React.useState(false)
  const [carregando,setCarregando]=React.useState(false);


  console.log(config)
  React.useEffect(()=>{
    const promise=axios.get(URL_PLANO_CLICADO,config);

    promise.then((response)=>{
      console.log('funfou');
      //perks é o obj com id, membership, title e link
      setDadosdaApi(response.data)
      setDadosPerks(response.data.perks)
      console.log(dadosPerks)
      setCarregando(true)

    })

    promise.catch(()=>{
      console.log('plano clicado não carregou ')
      setCarregando(false)
    })
  },[]);


    function MudarEstadoModal(e){
      e.preventDefault();
      setMostrarModal(true);
    }

  return (
    carregando==false? (
      <p>carregando aqui</p>
    ):
    (
    <EstiloPaginaPlanoClicado>
         <Link to='/subscriptions'>
            <ArrowBackOutline className='seta'
            color={'#ffffff'} 
            height="50px"
            width="50px"
            position={'fixed'}
            left={'0px'}
            top={'0px'}
            />
           </Link>

      <Topo>
        <img src={dadosdaApi.image}/>
        <h1>{dadosdaApi.name}</h1>
      </Topo>

      <div className='InformaçõesPlano'>
        <Beneficios>
       
        <h3>  <img src={prancheta} /> Benefícios</h3>
        </Beneficios>
        <ol>
          {dadosPerks.map(
            (item)=>{
              const {title,id}=item;

              return(
                <li key={id}> {title}</li>
              )
            }
          )}
        </ol>
      </div>

      <div className='InformaçõesPreco'>
        <h3><img src={dinheiro}/> Preco:</h3>
        <p>R$ {dadosdaApi.price} cobrados mensalmente</p>
      </div>
      {mostrarModal ? <TelaConfirmaPedido preco={dadosdaApi.price} nome={dadosdaApi.name} config={config} membershipId={membershipId} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} valoresInput={valoresInput}/> : ""}
      

      <form onSubmit={MudarEstadoModal}>
          <input type="text" placeholder='Nome impresso no cartão'  required value={valoresInput.cardName} onChange={(e)=>setValoresInput({...valoresInput,cardName:e.target.value})}/>

          <input type="number" placeholder='Dígitos do cartão' required value={valoresInput.cardNumber} onChange={(e)=>setValoresInput({...valoresInput,cardNumber:e.target.value})}/>
            <DoisUltimosInputs>
            <input type="number" placeholder='Código de segurança'  required value={valoresInput.securityNumber} onChange={(e)=>setValoresInput({...valoresInput,securityNumber:e.target.value})}/>

<input type="text" placeholder='Validade (mm/aa)' required value={valoresInput.expirationDate} onChange={(e)=>setValoresInput({...valoresInput,expirationDate:e.target.value})}/>
            </DoisUltimosInputs>
         
          <button type="submit">ASSINAR</button>
      </form>
    </EstiloPaginaPlanoClicado>)
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
  font-family: 'Roboto', sans-serif;

  .seta{
    position:fixed;
    left:0;
    top:0;
    padding:10px;
  }

  form{
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    margin:0 auto;
    input{
      width:80%;
      heigth:80%;
      border:1px solid #D5D5D5;
      margin-bottom:8px;
      font-size:20px;
      background:#FFF;
      border-radius:8px;
      margin-left:25px;
      padding:10px;
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

  h1{
    color:#FFF;
  }
  ion-icon {
    color: #FFFFFF;
    font-size: 35px;
}

  }
`
const Beneficios=styled.div`
  display:flex;
  justify-content:center;

`
const DoisUltimosInputs=styled.div`
  display:flex;
  width:90%;

  input{
    width:10px;
    padding:10px;
  }
`
const Topo=styled.div`
  margin-top:80px;

`
