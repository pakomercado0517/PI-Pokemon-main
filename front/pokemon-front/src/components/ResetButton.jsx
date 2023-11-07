/* eslint-disable react/prop-types */
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { resetFilters } from "../redux/actions";

export default function ResetButton({ allStateFilters }) {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(resetFilters());
    allStateFilters.map((filter) => filter(""));
  };

  return (
    <div>
      <Button onClick={handleReset}>Borrar filtros</Button>
    </div>
  );
}
