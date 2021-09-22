import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getName } from '../../actions'
import { useHistory } from 'react-router'

export default function SearchBar() {
  const dispatch= useDispatch()
  const [pokeName, setPokeName]= useState('')
  const allPokemons= useSelector(state=> state.pokemons)
  const history= useHistory()

  
  function handleInputChange(e){
    e.preventDefault()
    setPokeName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getName(pokeName))
    allPokemons.filter((val)=> {
      if(val.name.toLowerCase().includes(pokeName.toLowerCase())) {
        history.push(`/details/${val.id}`)
      }
      return val.id
    })
  }
  return(
    <div>
      <input type='text' placeholder='Search a Pokémon...' onChange={e=> handleInputChange(e)} />
      <button type='submit' onClick={e=> handleSubmit(e)} >Search</button>
    </div>
  )
}
