/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import ResetButton from "./ResetButton";
import SearchPokemon from "./SearchPokemon";
import FilterSelects from "./FilterSelects";

export default function Filters({ setCurrenPage }) {
  const [filterName, setFilterName] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentSearch, setCurrentSearch] = useState(""); //this is for show option to search behind the input

  return (
    <section className="w-screen grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3  gap-4">
      <div className="flex gap-4 items-center mt-6">
        <Link to="/createPokemon">
          <Button color="purple">Agregar Pokémon</Button>
        </Link>
        <ResetButton
          allStateFilters={[setFilterName, setFilterType, setCurrentSearch]}
        />
      </div>
      <div className="w-full">
        <FilterSelects
          filterName={filterName}
          setFilterType={setFilterType}
          filterType={filterType}
          setFilterName={setFilterName}
          setCurrenPage={setCurrenPage}
        />
      </div>
      <SearchPokemon
        currentSearch={currentSearch}
        setCurrentSearch={setCurrentSearch}
      />
    </section>
  );
}
