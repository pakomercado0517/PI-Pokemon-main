import React from 'react'
import './Paging.css'

export default function Paging({pokemonsPerPage, allPokemons, paging}) {
  const pageNumbers=[]

  for(let i=1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
    pageNumbers.push(i)
  }
  return(
    <div>
      {pageNumbers.length > 1 && pageNumbers.map((el,index)=>(
        <button className='pg_button' key={index} onClick={()=> paging(el)}>{el}</button>
      ))}
    </div>
  )
}