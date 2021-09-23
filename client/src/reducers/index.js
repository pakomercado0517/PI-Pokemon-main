import { bindActionCreators } from "redux"

const initialState= {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
  pokemonBackup:[],
}

function rootReducer(state= initialState, action ) {
  switch(action.type){
    case 'GET_POKEMONS':
      return {
        ...state,
        pokemons:action.payload,
        allPokemons:action.payload,
    }

    case 'GET_NAME_POKEMON':
      return {
        ...state,
        pokemons:action.payload
    }

    case 'FILTER_BY_TYPE':
      const allPokemons= state.allPokemons
      const filtered= action.payload === 'all' ? allPokemons : allPokemons.filter(e => e.types.map(el=> el.name)[0] === action.payload || e.types.map(el => el.name)[1] === action.payload)
      return {
        ...state,
        pokemons: filtered
    }

    case 'FILTER_CREATED':
      const allPokemons2= state.allPokemons
      const created= action.payload === 'created' ? allPokemons2.filter(e => e.createInDb)  : allPokemons2.filter(e=> !e.createInDb)
      return {
        ...state,
        pokemons: action.payload === 'all' ? state.allPokemons: created
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
          detail:[],
          types:[],
          pokemons:[],
          allPokemons:[]
        }


      default: return state;
  }
}

export default rootReducer;