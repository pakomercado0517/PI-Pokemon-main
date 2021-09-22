import React from 'react'
import './Card.css'

export default function Card({name, sprite, types}) {
  return(
    <div className='contenedor'>
      <h2>{name}</h2>
      <h3>{types}</h3>
      <img src={sprite} className='pokeSprite' alt="sprite img"/>
    </div>
  )

}