/* eslint-disable react/prop-types */
import { Label, Select } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPokemonsName,
  filterPokemonsType,
  resetFilters,
} from "../redux/actions";

export default function FilterSelects({
  filterName,
  setFilterName,
  filterType,
  setFilterType,
  setCurrenPage,
}) {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const handleChange = (e) => {
    if (e.target.value === "allPokemons") return dispatch(resetFilters());
    setFilterName(e.target.value);
    dispatch(filterPokemonsName(e.target.value));
  };

  const handleFilterType = (e) => {
    if (e.target.value === "allTypes") {
      setFilterName("allPokemons");
      return dispatch(resetFilters());
    }
    setFilterType(e.target.value);
    dispatch(filterPokemonsType(e.target.value));
    setCurrenPage(1);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center">
      <div className="flex flex-col w-full">
        <Label className="text-white">Filtrar por Nombres:</Label>
        <Select
          name="nameFiltered"
          className="w-[88vw] lg:w-[15vw]"
          value={filterName}
          onChange={handleChange}
        >
          <option value="allPokemons">Filtro inicial</option>
          <option value="asc">Nombre A-Z</option>
          <option value="desc">Nombre Z-A</option>
        </Select>
      </div>

      <div className="w-full">
        <Label className="text-white">Filtrar por Tipos:</Label>
        <Select
          name="typeFiltered"
          value={filterType}
          className="w-[88vw] lg:w-[15vw]"
          onChange={handleFilterType}
        >
          <option value="allTypes">Todos los Tipos</option>
          {types.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
