import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../redux/actions";
import PokemonCard from "./PokemonCard";
import { Pagination } from "flowbite-react";
import usePaginate from "../hooks/usePaginate";
import Filters from "./Filters";

export default function PokemonList() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const filtered = useSelector((state) => state.filtered);
  const [pokemonPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const pokemonsList = filtered.length > 0 ? filtered : pokemons;
  currentPage === 0 ? setCurrentPage(1) : currentPage;
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const pageNumbers = usePaginate(pokemonPerPage, pokemonsList.length);

  const currentPokemons = pokemonsList.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paging = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch, filtered]);

  return (
    <section>
      <Filters setCurrenPage={setCurrentPage} />
      <div className="flex justify-center my-8">
        <Pagination
          currentPage={currentPage}
          totalPages={pageNumbers.length}
          onPageChange={paging}
        />
      </div>
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {currentPokemons.length !== 0 ? (
          currentPokemons?.map((el) => <PokemonCard key={el.id} item={el} />)
        ) : (
          <img
            src="https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif"
            alt="loading"
            className="mx-auto my-auto"
          />
        )}
      </article>
    </section>
  );
}
