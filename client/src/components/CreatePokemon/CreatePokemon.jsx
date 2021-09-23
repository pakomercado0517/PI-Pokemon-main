import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes } from '../../actions'
// import Pokeball from '../Pokeball/Pokeball';

function validate(el) {
  let errors= {}
  if(!el.name) errors.name= 'Name must be completed'
  return errors
}

export default function PokemonCreate() {
  const dispatch= useDispatch()
  const history= useHistory()
  const types= useSelector(state=> state.types)
  const [err, setErr]= useState({})
  const [input, setInput]= useState({
    name:"",
    hp:"",
    attack:"",
    defense:"",
    speed:"",
    height:"",
    weight:"",
    sprite:"",
    types:[],
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErr(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }
  
  function handleSelect(e) {
    input.types.length < 2 && !input.types.includes(e.target.value) ? setInput({
      ...input,
      types:[...input.types, e.target.value]
    }) : alert('Maximum two types')
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(input)
    dispatch(postPokemon(input))
    alert('Pokémon created')
    setInput({
      name:"",
      hp:"",
      attack:"",
      defense:"",
      speed:"",
      height:"",
      weight:"",
      sprite:"",
      types:[],
    })
    history.push('/home')
  }

  function handleDelete(e) {
    setInput({
      ...input,
      types: input.types.filter(el => el !== e)
    })
  }

  useEffect(()=> {
    dispatch(getTypes())
  }, [dispatch])
  
  return(
    <div>
      <h1>Time to create a Pokémon</h1>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <label>Name:</label>
        <input type="text" value={input.name} name="name" onChange={(e)=> handleChange(e)} />
        {err.name && (
          <p>{err.name}</p>
        )}

        <label>Hp:</label>
        <input type="number" value={input.hp} name="hp" onChange={(e)=>handleChange(e)} />

        <label>Attack:</label>
        <input type="number" value={input.attack} name="attack" onChange={(e)=>handleChange(e)} />

        <label>Defense:</label>
        <input type="number" value={input.defense} name="defense" onChange={(e)=>handleChange(e)} />

        <label>Speed:</label>
        <input type="number" value={input.speed} name="speed" onChange={(e)=>handleChange(e)} />

        <label>Height:</label>
        <input type="number" value={input.height} name="height" onChange={(e)=>handleChange(e)} />

        <label>Weight:</label>
        <input type="number" value={input.weight} name="weight" onChange={(e)=>handleChange(e)} />

        <label>Sprite:</label>
        <input type="text" value={input.sprite} name="sprite" onChange={(e)=>handleChange(e)} />

        <label>Types:</label>
        <select onChange={(e)=> handleSelect(e)} >
          {types.map(el=> {
            return <option value={el}>{el}</option>
          })}
        </select>
        <ul>
          <p>{input.types.map(el=> `${el}, `)}</p>
        </ul>
        <button type="submit" >Create</button>
        <Link to='/home'><button>Return</button></Link>
      </form>

      {input.types.map(el=> 
      <div>
        <p>{el}</p>
        <button onClick={(e)=> handleDelete(e)}>x</button>
      </div>)}
    </div>
  )
}