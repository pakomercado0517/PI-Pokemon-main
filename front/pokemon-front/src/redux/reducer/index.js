/* eslint-disable no-case-declarations */
import Swal from "sweetalert2";

import {
  GET_ALL_POKEMONS,
  FILTER_POKEMONS_NAME,
  RESET_FILTERS,
  GET_TYPES,
  FILTER_POKEMONS_TYPE,
  GET_POKEMON_API_INFORMATION,
  ERROR_RESPONSE,
  CREATE_POKEMON,
  CLEAN_FORM,
  SEARCH_POKEMON,
} from "../actions";

const initialState = {
  pokemons: [],
  filtered: [],
  types: [],
  apiInformation: [],
  errorResponse: [],
  newPokemon: [],
};
export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_POKEMONS:
      return { ...state, pokemons: payload };

    case FILTER_POKEMONS_NAME:
      // state.filtered = initialState.filtered;
      const pokemonObj =
        state.filtered.length > 0 ? [...state.filtered] : [...state.pokemons];
      const pokemonsFiltered =
        payload === "asc"
          ? pokemonObj.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : pokemonObj.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });

      return {
        ...state,
        filtered: pokemonsFiltered,
      };

    case RESET_FILTERS:
      return { ...state, filtered: initialState };

    case GET_TYPES:
      return { ...state, types: payload };

    case FILTER_POKEMONS_TYPE:
      const pokemonsFilteredType = state.pokemons.filter(
        (el) =>
          el.types.map((item) => item.name)[0] === payload ||
          el.types.map((item) => item.name)[1] === payload
      );
      if (pokemonsFilteredType.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "No se encontraron Pokemones con ese tipo, intenta agregar alguno que te guste 😃",
          showCloseButton: true,
        });
      }
      return { ...state, filtered: pokemonsFilteredType };

    case GET_POKEMON_API_INFORMATION:
      return {
        ...state,
        apiInformation: payload,
      };

    case ERROR_RESPONSE:
      return { ...state, errorResponse: payload };

    case CREATE_POKEMON:
      return { ...state, newPokemon: payload };

    case CLEAN_FORM:
      return { ...state, apiInformation: initialState.apiInformation };

    case SEARCH_POKEMON:
      return { ...state, filtered: payload };

    default:
      return state;
  }
}
