import React,{ useState, useEffect  } from "react";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getName, getPokemons,  filterByType, filterCreated, orderByName, orderByAttack, getPaginate } from "../../actions";
import Card from '../Card/Card'
import Paging from '../Paging/Paging'
import SearchBar from '../SearchBar/SearchBar'
import './Home.css'


export default function Home() {
  const dispatch= useDispatch()
  const allPokemons= useSelector(state=> state.pokemons)
  const searchBackup= useSelector(state=> state.searchBackup)
  const backup= useSelector(state=> state.pokemonBackup)
  const [pokeName, setPokeName]= useState('')
  const [order, setOrder]= useState('')
  const [loading, setLoading]= useState(false)
  const [orderAttack, setOrderAttack]= useState('')
  const currentPage= backup===0 ? 1 : backup
  const [pokemonsPerPage]= useState(9)
  const indexLast= currentPage * pokemonsPerPage
  const indexFirst= indexLast - pokemonsPerPage
  const filteredPokemons= useSelector(state => state.filteredPokemons)
  let pokeCurrents= filteredPokemons.length > 0 
                    ? filteredPokemons 
                    : searchBackup 
                    ? filteredPokemons 
                    : allPokemons
                    
    // console.log('searchBackup: ', searchBackup)      
    // console.log('pokecurrents: ', pokeCurrents.length)
    // console.log('filteredPokemons: ', filteredPokemons.length)

  const showPokemons= pokeCurrents.length > 0 ? pokeCurrents.slice(indexFirst, indexLast) : pokeCurrents;
  // Array.isArray(pokeCurrents) && pokeCurrents.slice(indexFirst, indexLast)
  // console.log(Array.isArray(pokeCurrents))
  // console.log(filteredPokemons)
  console.log(showPokemons)
  console.log(pokeCurrents)
  const paginate= (page)=> {
    dispatch(getPaginate(page))
  }
  
  
  useEffect(()=> {
    async function getData() {
      setLoading(true)
      await dispatch(getPokemons())
      setLoading(false)
      // console.log(loading)
    }
    getData()
    }, [dispatch])
  


  function handleClick(e) {
    e.preventDefault()
    dispatch(getPokemons())
  }

  function handleFilterType(e) {
    dispatch(filterByType(e.target.value))
  }

  function handleFilterCreated(e) {
    e.preventDefault()
    dispatch(filterCreated(e.target.value))
  }

  function handleSort(e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    // console.log(order)
    // setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleSortAttack(e){
    e.preventDefault()
    dispatch(orderByAttack(e.target.value))
    console.log(orderAttack)
    // setCurrentPage(1)
    setOrderAttack(`Ordenado ${e.target.value}`)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await dispatch(getName(pokeName))
    setLoading(false)
    
  }

  function handleInputChange(e){
    e.preventDefault()
    setPokeName(e.target.value)
  }

  
  console.log(isNaN(showPokemons))
  return(
    <div>
      <div className='searchBar'>
        <SearchBar handleSubmit={handleSubmit} handleInputChange={handleInputChange}/>
        <Link to='/pokemon'><button className='create_button'>Create a Pokémon</button></Link>
      </div>
      <div>
        
      </div>
      <div className='filter_box'>
        <select className='select_filter' onChange={handleSort} >
          <option value="asc">Ascending Order</option>
          <option value="desc">Descending Order</option>
        </select>
        <select className='select_filter' onChange={handleSortAttack}>
          <option value="strong">Stronger Attack</option>
          <option value="weak">Weaker Attack</option>
        </select>
        <select className='select_filter' onChange={handleFilterType} >
          <option value="all">All Types</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="unknown">Unknown</option>
          <option value="shadow">Shadow</option>
        </select>
        <select className='select_filter' onChange={handleFilterCreated}>
          <option value="all">All Pokémon</option>
          <option value="api">Existing</option>
          <option value="created">Created</option>
        </select>
        <button className='filter_button' onClick={handleClick}>Delete fiters</button>
        </div>
        <div className='home_cards'>
          {
            showPokemons && 
            <div>
              <Paging
              pokemonsPerPage={pokemonsPerPage}
              allPokemons={pokeCurrents.length}
              paging={paginate}
              />
            </div>
          }
        </div>
        <div className='pokeCards'>
          {
            loading 
            ? 
            <div className='loading_gif'>
              <img src='https://images.chesscomfiles.com/uploads/v1/group/76962.73d2aef4.50x50o.05adf4794fcc.gif' alt='loading gif' />
            </div> 
            :
            showPokemons.length > 0 
            ?
            showPokemons.map(el=> {
              return(
                <div key={el.id}>
                  <Link className='card_link' to={`/details/${el.id}`} >
                    <Card
                    name={el.name}
                    types={el.types.map( (e)=> e.name + (' '))}
                    sprite={el.sprite}
                    />
                  </Link>
                </div>
              )
            }) 
            :
            <h1>Pokemons not finded...</h1> 
          }
        </div>
    </div>
  )
}