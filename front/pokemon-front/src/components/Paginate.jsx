/* eslint-disable react/prop-types */
import { Button } from "flowbite-react";

export default function Paginate({ pokemonPerPage, allPokemons, paging }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Button.Group className="">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <Button color="gray" key={number} onClick={() => paging(number)}>
              {number}
            </Button>
          ))}
      </Button.Group>
    </div>
  );
}
