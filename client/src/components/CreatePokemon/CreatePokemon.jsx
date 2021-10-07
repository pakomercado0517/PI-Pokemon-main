import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes, getNameData } from '../../actions'
import './CreatePokemon.css'

function validate(el) {
  let errors= {}
  if(!el.name) errors.name= 'Name must be completed'
  return errors
}

export default function PokemonCreate() {
  const dispatch= useDispatch()
  const history= useHistory()
  const types= useSelector(state=> state.types)
  const nameData= useSelector(state=> state.pokeNameData)
  const [err, setErr]= useState({})
  const [input, setInput]= useState({
    name:"",
    hp:"",
    attack:"",
    defense:"",
    speed:"",
    height: "",
    weight:"",
    sprite: "",
    types:[],
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
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
    setInput({
      name:"",
      hp:"",
      attack:"",
      defense:"",
      speed:"",
      height:"",
      weight:"",
      sprite: "",
      types:[],
    })
    history.push('/postpokemon')
  }

  function handleDelete(e) {
    console.log(e.target.name)
    setInput({
      ...input,
      types: input.types.filter((el) => el !== e.target.name)
    })
  }

  useEffect(()=> {
    dispatch(getTypes())
    const timer = setTimeout(() => {
      dispatch(getNameData(input.name.toLowerCase()))
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch, input.name, nameData])
  

  useEffect(()=> {
    setInput({
      ...input,
      sprite: nameData,
    })
  },[nameData])
  
  console.log('nameData: ', nameData)
  return(
    <div>
      <h1 className='cp_title'>Time to create a Pokémon</h1>
      <div className='cp_form'>
        <form onSubmit={(e)=> handleSubmit(e)}>
          <div>
            <label>Name: </label>
            <input className='cp_input' type="text" value={input.name} name="name" onChange={handleChange} />
            {err.name && (
              <p>{err.name}</p>
            )}

            <label>Hp:</label>
            <input className='cp_input' type="number" value={input.hp} name="hp" onChange={handleChange} />

            <label>Attack:</label>
            <input className='cp_input' type="number" value={input.attack} name="attack" onChange={handleChange} />

            <label>Defense:</label>
            <input className='cp_input' type="number" value={input.defense} name="defense" onChange={handleChange} />

            <label>Speed: </label>
            <input className='cp_input' type="number" value={input.speed} name="speed" onChange={handleChange} />

            <label>Height: </label>
            <input className='cp_input' type="number" value={input.height} name="height" onChange={handleChange} />

            <label>Weight: </label>
            <input className='cp_input' type="number" value={input.weight} name="weight" onChange={handleChange} />

            <label>Sprite: </label>
            <input className='cp_input' type="text" value={input.sprite} name="sprite" onChange={handleChange}/>

            <label>Types <br/> (Maximum 2 types): </label>
            <select className='cp_input' onChange={(e)=> handleSelect(e)} >
              {types.map((el)=> {
                return <option key={el} value={el}>{el}</option>
              })}
            </select>
          </div>
          <button className='cp_button_create' type="submit" >Create</button>
          <Link to='/home'><button className='cp_button_home'>Return</button></Link>
        </form>

            {/* Muestro los tiops elegidos... */}
        <div className='cp_types_box'>
          {input.types.map((el, index)=> 
            <div key={index} className={'cp_types ' + el + (' ')}>
              <p >{el}</p>
              <button className='cp_button_close' name={el} onClick={handleDelete}>x</button>
            </div>)
          }
          <hr/>
          <div>
            <img src={nameData} alt='img_pokemon' className='cp_poke_image' />
          </div>
        </div>

      </div>
    </div>
  )
}