
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserContext from "./Contexts/UserContext"
import Home from "./Components/Home"
import Cadastro from "./Components/Cadastro"
import Login from './Components/Login'
import Plano from './Components/Plano'
import Planos from './Components/Planos'

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  const config={
    Headers:{
      "Authorization": `Bearer ${token}`
    }
  }

  const [dadosdoPlano, setDadosdoPlano] = React.useState(null);
  const [dadosEspecificosPlano,setDadosEspecificosPlano]=React.useState(null)
  const [membership, setMembership] = React.useState(localStorage.getItem('membership'));


  return (
    <UserContext.Provider value={{token,setToken, dadosdoPlano,setDadosdoPlano, dadosEspecificosPlano, setDadosEspecificosPlano, membership, setMembership, config}}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/sign-up" element={<Cadastro />}/>
          <Route path="/subscriptions" element={<Planos />}/>
          <Route path="/subscriptions/:ID" element={<Plano />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </BrowserRouter>

    </UserContext.Provider >
  )
}

export default App;
