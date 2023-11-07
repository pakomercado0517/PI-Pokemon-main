import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Pokeball from '../Pokeball/Pokeball'

export default function PostPokemon() {
  const history= useHistory()

  useEffect(() => {
  const timer = setTimeout(() => {
    alert('Your Pokémon has been captured!!!')
    history.push('/home')
  }, 4000);
  return () => clearTimeout(timer);
}, [])
  
  return (
    <div><Pokeball/></div>
  )
}