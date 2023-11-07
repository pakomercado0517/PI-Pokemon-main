export default function usePaginate(pokemonPerPage, allPokemons) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
}
