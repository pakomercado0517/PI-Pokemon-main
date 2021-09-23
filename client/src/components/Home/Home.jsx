import React,{ useState, useEffect  } from "react";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getPokemons,  filterByType, filterCreated, orderByName, orderByAttack, getInitialState } from "../../actions";
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
  const [loading, setLoading]= useState(false)
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
    async function getData(){
      await dispatch(getPokemons())
      setLoading(true)
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
  // console.log(showPokemons.length)
  return(
    <div>
      <Header/>
      <div className='searchBar'>
        <SearchBar/>
        <Link to='/pokemon'><button className='create_button'>Create a Pokémon</button></Link>
      </div>
      <div>
        
      </div>
      <div className='filter_box'>
        <select className='select_filter' onChange={e=> handleSort(e)} >
          <option value="asc">Ascending Order</option>
          <option value="desc">Descending Order</option>
        </select>
        <select className='select_filter' onChange={e=> handleSortAttack(e)}>
          <option value="strong">Stronger Attack</option>
          <option value="weak">Weaker Attack</option>
        </select>
        <select className='select_filter' onChange={e=> handleFilterType(e)} >
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
        <select className='select_filter' onChange={e=> handleFilterCreated(e)}>
          <option value="all">All Pokémon</option>
          <option value="api">Existing</option>
          <option value="created">Created</option>
        </select>
        <button className='filter_button' onClick={e=> handleClick(e)}>Delete fiters</button>
        </div>
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
            loading === true ?
            showPokemons.map(el=> {
              return(
                <div>
                  <Link className='card_link' to={`/details/${el.id}`} >
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
  )
}