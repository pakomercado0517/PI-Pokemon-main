// import { bindActionCreators } from "redux"

const initialState= {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
  pokemonBackup:0,
  pokeCache:[],
  pokeNameData:[],
  filteredPokemons:[],
  searchBackup: false,
}

function rootReducer(state= initialState, action ) {
  console.log('llegué...', action.payload)
  switch(action.type){
    case 'GET_POKEMONS':
      return {
        ...state,
        pokemons:action.payload,
        allPokemons:action.payload,
    }

    case 'GET_NAME_POKEMONS':
      return {
        ...state,
        filteredPokemons:action.payload,
        // searchBackup: true,
    }

    case 'GET_NAME_DATA':
      return {
        ...state,
        pokeNameData: action.payload
      }

    case 'FILTER_BY_TYPE':
      const allPokemons= state.allPokemons
      const filtered= action.payload === 'all' ? allPokemons : allPokemons.filter(e => e.types.map(el=> el.name)[0] === action.payload || e.types.map(el => el.name)[1] === action.payload)
      if(filtered === 0) return alert('No Pokémons finded...')
      return {
        ...state,
        filteredPokemons: filtered,
        searchBackup: true,
    }

    case 'FILTER_CREATED':
      const allPokemons2= state.allPokemons
      const created= action.payload === 'created' ? allPokemons2.filter(e => e.createdInDb)  : allPokemons2.filter(e=> !e.createdInDb)
      return {
        ...state,
        filteredPokemons: action.payload === 'all' ? allPokemons2 : created,
      }

    case 'ORDER_BY_NAME':
      let sortElement= action.payload === 'asc' ?
      state.pokemons.sort((a,b)=> {
        if(a.name > b.name)  return 1
        if(b.name > a.name)  return -1
        return 0
      }) :
      state.pokemons.sort((a,b)=> {
        if(a.name > b.name) return -1
        if(b.name > a.name) return 1
        return 0
      })
      return {
        ...state,
        pokemons: sortElement
      }

    case 'ORDER_BY_ATTACK':
      let sortAttack= action.payload === 'strong' ?
      state.pokemons.sort((a,b)=> {
        if(a.attack > b.attack) return -1
        if(b.attack > a.attack) return 1
        return 0
      }) :
      state.pokemons.sort((a,b)=> {
        if(a.attack > b.attack) return 1
        if(b.attack > a.attack) return -1
        return 0
      })
      return {
        ...state,
        pokemons: sortAttack
      }

    case 'POST_POKEMON':
      return {
        ...state
      }

    case 'GET_TYPES':
      return{
        ...state,
        types: action.payload
      }

    case 'GET_DETAILS':
      return {
        ...state,
        detail: action.payload
      }

    case 'GET_INITIAL_STATE':
      return {
        ...state,
        detail: [],
        filteredPokemons:[],
        pokeNameData:[],
      }
      
    case 'GET_PAGINATE':
      return {
        ...state,
        pokemonBackup: action.payload
      }

    case 'CACHE_API': 
    return {
      ...state,
      pokeCache: action.payload
    }

    default: return state;
  }
}

export default rootReducer;