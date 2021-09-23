import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {getDetail, getInitialState} from '../../actions/index'
import './Detail.css'


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
        <div className='container'>
          <div className='detail_body'>
            <h1>{pokeDetail.name}</h1>
            <h3>Types: {pokeDetail.types.map(el=> `[${el.name}] `)}</h3>
            <p>Id: {pokeDetail.id}</p>
            <p>Hp: {pokeDetail.hp}</p>
            <p>Attack: {pokeDetail.attack}</p>
            <p>Defense: {pokeDetail.defense}</p>
            <p>Speed: {pokeDetail.speed}</p>
            <p>Height: {pokeDetail.height}</p>
            <p>Weight: {pokeDetail.weight}</p>
          </div>
          <div className='detail_img'>
            <img src={pokeDetail.sprite} alt='pokemon-img' width='200px' height='220px'/>
          </div>
        </div> :
        <img src='https://i.gifer.com/Yg6z.gif' alt='loading gif' />
      }
      <Link to='/home'><button className='detail_goBack'>Go Back</button></Link>
    </div>
  )
}


