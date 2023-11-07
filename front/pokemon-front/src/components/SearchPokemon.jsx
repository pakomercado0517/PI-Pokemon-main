/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextInput, Label } from "flowbite-react";
import { BiSearchAlt } from "react-icons/bi";
import { searchPokemon } from "../redux/actions";

export default function SearchPokemon({ currentSearch, setCurrentSearch }) {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const [searchName, setSearchName] = useState({});

  const [showSearchOptions, setShowSearchOptions] = useState(false);

  const handleSearch = (e) => {
    setCurrentSearch(e.target.value);
    if (currentSearch.length > 0) setShowSearchOptions(true);
  };

  const handleSearchSelect = (name) => {
    setCurrentSearch(name);
    setShowSearchOptions(false);
  };

  useEffect(() => {
    if (currentSearch.length > 0) {
      const filterName = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(currentSearch.toLowerCase())
      );
      setSearchName(filterName);
      dispatch(searchPokemon(filterName));
    }

    if (currentSearch.length === 0) setShowSearchOptions(false);
  }, [currentSearch, pokemons, dispatch]);

  return (
    <section className="relative ">
      <Label className="text-white">Buscar Pokemón</Label>
      <TextInput
        name="search"
        id="search"
        className="w-[30vw]"
        onChange={handleSearch}
        value={currentSearch}
      />
      <span className="absolute top-9 z-10">
        <BiSearchAlt className="ml-2 text-gray-300" />
      </span>

      {showSearchOptions && (
        <div className="bg-white h-auto sticky w-64 border rounded-md">
          {searchName.length > 0 ? (
            searchName.map((el) => (
              <p
                className="text-gray-700 cursor-pointer hover:bg-gray-600 hover:text-white"
                key={el.id}
                onClick={() => handleSearchSelect(el.name)}
              >
                {el.name}
              </p>
            ))
          ) : (
            <p className="text-gray-700 text-sm">
              No hay pokemones encontrados...
            </p>
          )}
        </div>
      )}
    </section>
  );
}
