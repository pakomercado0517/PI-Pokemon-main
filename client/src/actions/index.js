import axios from 'axios'

export const getPokemons= () => {
  return async function(dispatch) {
    try {
      const resURL= await axios.get('http://localhost:3001/pokemons',{
        timeout: 90000,
      })
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
      const  infoURL= await axios('http://localhost:3001/types', {
        timeout: 90000,
      })
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
      let pokeName= []
      const nameURL= await axios.get(`http://localhost:3001/pokemons?name=${name}`)
      console.log('Respuesta es' , nameURL.data)
      // let info= nameURL.data.error ? pokeName : pokeName.push(nameURL.data)
      let info;
      if(nameURL.data.error) {
        info= pokeName;
      }else {
        pokeName.push(nameURL.data)
        info= pokeName;
      }
      
      return dispatch({
        type: 'GET_NAME_POKEMONS',
        payload: info,
      })
    } catch (error) {
      
    }
  }
}

export const getDetail= (id)=> {
  return async function(dispatch) {
    try {
      const getDetail= await axios.get(`http://localhost:3001/pokemons/${id}`, {
        timeout:90000,
      })
      return dispatch({
        type: 'GET_DETAILS',
        payload: getDetail.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getNameData= (name) => {
  return async function(dispatch) {
    try {
      const getUrl= await axios.get(`http://localhost:3001/pokemons/search/${name}`, {
        timeout:90000,
      })
      return dispatch({
        type: 'GET_NAME_DATA',
        payload: getUrl.data
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

export const getInitialState= () => {
  return {
    type: 'GET_INITIAL_STATE',
  }
}

export const getPaginate= (payload)=> {
  return {
    type: 'GET_PAGINATE',
    payload
  }
}

export const cacheAPI=(payload)=> {
  return {
    type: 'CACHE_API',
    payload
  }
}

