import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {getDetail, getInitialState} from '../../actions/index'


export default function Detail(props) {
  const pokeId= props.match.params.id
  const dispatch= useDispatch()
  let pokeDetail= useSelector(state=> state.detail)
  useEffect(()=> {
    dispatch(getDetail(pokeId))
    return dispatch(getInitialState())
  },[dispatch, pokeId])
  


  
  
  console.log(pokeDetail)
  console.log(pokeDetail.name)
  
  return(
    <div>
      {
        isNaN(pokeDetail.length) === true ?
        <div>
          <h1>{pokeDetail.name}</h1>
          <img src={pokeDetail.sprite} alt='pokemon-img' width='200px' height='220px'/>
          <h3>Types: {pokeDetail.types.map(el=> el.name + (' '))}</h3>
          <h4>Id: {pokeDetail.id}</h4>
          <h4>Hp: {pokeDetail.hp}</h4>
          <h4>Attack: {pokeDetail.attack}</h4>
          <h4>Defense: {pokeDetail.defense}</h4>
          <h4>Speed: {pokeDetail.speed}</h4>
          <h4>Height: {pokeDetail.height}</h4>
          <h4>Weight: {pokeDetail.weight}</h4>
        </div> :
        <img src='https://i.gifer.com/Yg6z.gif' alt='loading gif' />
      }
      <div>
        <Link to='/home'><button>Go Back</button></Link>
      </div>
    </div>
  )
}


