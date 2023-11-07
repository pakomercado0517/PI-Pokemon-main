import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getInitialState, getName } from '../../actions'
import './SearchBar.css'

export default function SearchBar({handleSubmit, handleInputChange}) {
  // const allPokemons= useSelector(state=> state.pokemons)
  // const history= useHistory()

  
  

  
  return(
    <div>
      <form className='search_form' onSubmit={e=>e.preventDefault()} role='search'>
        <div>
          <input className='search_input' type='search' placeholder='Search a Pokémon...' onChange={handleInputChange} />
          <button className='search_button' type='submit' onClick={handleSubmit} >Search</button>
        </div>
        <div>
        </div>
      </form>
    </div>
  )
}


// allPokemons.filter((val)=> {
    //   if(val.name.toLowerCase().includes(pokeName.toLowerCase())) {
    //     // history.push(`/details/${val.id}`)
    //   }else{
    //     return console.log('Ese pokemon no existe...')
    //   }
    //   return val.id;
    // })