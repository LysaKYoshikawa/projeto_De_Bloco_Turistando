import React from 'react'
import {Link} from 'react-router-dom'

export default function Login(){
  return (
    <>
      <h2>ÁREA DE LOGIN</h2>
      <Link to="/turistando"><button>Ir para o mapa</button></Link>
      <h2>Avaliar</h2>
      <Link to="/rating"><button>Ir para rating</button></Link>
    </>
  )
}