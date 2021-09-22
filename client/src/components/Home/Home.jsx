import React,{ useState, useEffect  } from "react";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getPokemons,  filterByType, filterCreated, orderByName, orderByAttack } from "../../actions";
import Card from '../Card/Card'
import Paging from '../Paging/Paging'
import SearchBar from '../SearchBar/SearchBar'
import './Home.css'
import Header from "../Header/Header";


export default function Home() {
  const dispatch= useDispatch()
  const allPokemons= useSelector(state=> state.pokemons)
  // const types= useSelector(state=> state.types)
  const [order, setOrder]= useState('')
  const [orderAttack, setOrderAttack]= useState('')
  const [currentPage, setCurrentPage]= useState(1)
  const [pokemonsPerPage]= useState(9)
  const indexLast= currentPage * pokemonsPerPage
  const indexFirst= indexLast - pokemonsPerPage
  const showPokemons= Array.isArray(allPokemons) && allPokemons.slice(indexFirst, indexLast)
  const paginate= (page)=> {
    setCurrentPage(page)
  }
  
  useEffect(()=> {
    dispatch(getPokemons())
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault()
    dispatch(getPokemons())
  }

  function handleFilterType(e) {
    dispatch(filterByType(e.target.value))
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value))
  }

  function handleSort(e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    console.log(order)
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleSortAttack(e){
    e.preventDefault()
    dispatch(orderByAttack(e.target.value))
    console.log(orderAttack)
    setCurrentPage(1)
    setOrderAttack(`Ordenado ${e.target.value}`)
  }
  console.log(showPokemons.length)
  return(
    <div>
      <Header/>
      <div>
        <SearchBar/>
      </div>
      <div>
        <Link to='/pokemon'><button>Create Pokémon</button></Link>
        <select onChange={e=> handleSort(e)} >
          <option value="asc">Ascending Order</option>
          <option value="desc">Descending Order</option>
        </select>
        <select onChange={e=> handleSortAttack(e)}>
          <option value="strong">Stronger Attack</option>
          <option value="weak">Weaker Attack</option>
        </select>
        <select onChange={e=> handleFilterType(e)} >
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
        <select onChange={e=> handleFilterCreated(e)}>
          <option value="all">All Pokémon</option>
          <option value="api">Existing</option>
          <option value="created">Created</option>
        </select>
        <button onClick={e=> handleClick(e)}>Delete fiters</button>
        <div>
          {
            showPokemons && 
            <div>
              <Paging
              pokemonsPerPage={pokemonsPerPage}
              allPokemons={allPokemons.length}
              paging={paginate}
              />
            </div>
          }
        </div>
        <div className='pokeCards'>
          {
            showPokemons.length > 0 ?
            showPokemons.map(el=> {
              return(
                <div>
                  <Link to={`/details/${el.id}`} replace >
                    <Card
                    name={el.name}
                    types={el.types.map(e=> e.name + (' '))}
                    sprite={el.sprite}
                    key={el.id}
                    />
                  </Link>
                </div>
              )
            }) :
            <div className='loading_gif'>
              <img src='https://i.gifer.com/Yg6z.gif' alt='loading gif' />
              {/* <Link to={`/details/${allPokemons.id}`}>
                <Card
                name={allPokemons.name}
                types={allPokemons.types.map(el=> el.name + (' '))}
                sprite={allPokemons.sprite}
                key={allPokemons.id}
                />
              </Link> */}
            </div>
          } 
        </div>
      </div>
    </div>
  )
}