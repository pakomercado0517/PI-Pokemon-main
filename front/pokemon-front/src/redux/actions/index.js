import axios from "axios";
const SERVER_URL = "http://localhost:3001";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMONS_BY_TYPE = "GET_POKEMONS_BY_TYPE";
export const FILTER_POKEMONS_NAME = "FILTER_POKEMONS_NAME";
export const RESET_FILTERS = "RESET_FILTERS";
export const GET_TYPES = "GET_TYPES";
export const FILTER_POKEMONS_TYPE = "FILTER_POKEMONS_TYPE";
export const GET_POKEMON_API_INFORMATION = "GET_POKEMON_API_INFORMATION";
export const ERROR_RESPONSE = "ERROR_RESPONSE";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const CLEAN_FORM = "CLEAN_FORM";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const getAllPokemons = () => async (dispatch) => {
  try {
    const pokemons = await axios.get(`${SERVER_URL}/pokemons`);
    dispatch({
      type: GET_ALL_POKEMONS,
      payload: pokemons.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const getPokemonsByType = (type) => async (dispatch) => {
  try {
    const pokemons = await axios.get(
      `${SERVER_URL}/pokemons/filterType/${type}`
    );
    dispatch({
      type: GET_POKEMONS_BY_TYPE,
      payload: pokemons.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const filterPokemonsName = (order) => (dispatch) => {
  dispatch({
    type: FILTER_POKEMONS_NAME,
    payload: order,
  });
};

export const resetFilters = () => (dispatch) => {
  dispatch({
    type: RESET_FILTERS,
  });
};

export const getTypes = () => async (dispatch) => {
  try {
    const types = await axios.get(`${SERVER_URL}/types`);
    dispatch({
      type: GET_TYPES,
      payload: types.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const filterPokemonsType = (type) => (dispatch) => {
  dispatch({
    type: FILTER_POKEMONS_TYPE,
    payload: type,
  });
};

export const getPokemonApiInformation = (name) => async (dispatch) => {
  try {
    const pokemon = await axios.get(
      `${SERVER_URL}/pokemons/api_information/${name}`
    );
    dispatch({
      type: GET_POKEMON_API_INFORMATION,
      payload: pokemon.data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: GET_POKEMON_API_INFORMATION,
      payload: error.response,
    });
  }
};

export const createPokemon = (data) => async (dispatch) => {
  try {
    const newPokemon = await axios.post(`${SERVER_URL}/pokemons`, data);
    dispatch({
      type: CREATE_POKEMON,
      payload: newPokemon.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const cleanForm = () => (dispatch) => {
  dispatch({
    type: CLEAN_FORM,
  });
};

export const searchPokemon = (name) => (dispatch) => {
  dispatch({
    type: SEARCH_POKEMON,
    payload: name,
  });
};
