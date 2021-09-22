import axios from 'axios'

export const getPokemons= () => {
  return async function(dispatch) {
    try {
      const resURL= await axios.get('http://localhost:3001/pokemons')
      return dispatch({
        type: 'GET_POKEMONS',
        payload: resURL.data,
      })
    } catch(error) {
      console.log(error)
    }
  }
}

export const getTypes= ()=> {
  return async function(dispatch) {
    try {
      const  infoURL= await axios('http://localhost:3001/types')
      return dispatch({
        type:'GET_TYPES',
        payload: infoURL.data,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const postPokemon= (payload)=> {
  return async function() {
    try {
      const postURL= await axios.post('http://localhost:3001/pokemons', payload)
      console.log(postURL)
      return postURL
    } catch (error) {
      console.log(error)
    }
  }
}

export const getName= (name)=> {
  return async function(dispatch) {
    try {
      const nameURL= await axios.get(`http://localhost:3001/pokemons?name=${name}`)
      return dispatch({
        type: 'GET_NAME_POKEMONS',
        payload: nameURL.data,
      })
    } catch (error) {
      
    }
  }
}

export const getDetail= (id)=> {
  return async function(dispatch) {
    try {
      const getDetail= await axios.get(`http://localhost:3001/pokemons/${id}`)
      return dispatch({
        type: 'GET_DETAILS',
        payload: getDetail.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const filterByType= (payload)=> {
  return {
    type: 'FILTER_BY_TYPE',
    payload
  }
}

export const filterCreated= (payload)=> {
  return {
    type: 'FILTER_CREATED',
    payload
  }
}

export const orderByName= (payload)=> {
  return {
    type:'ORDER_BY_NAME',
    payload
  }
}

export const orderByAttack= (payload)=> {
  return {
    type: 'ORDER_BY_ATTACK',
    payload
  }
}

export const getInitialState= (payload) => {
  return {
    type: 'GET_INITIAL_STATE',
    payload
  }
}

