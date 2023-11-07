import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
export default function Welcome() {
  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold pt-5">
        Bienvenidos a la Pokedex de Pako
      </h1>
      <img
        className="rounded-xl m-8"
        src="https://media3.giphy.com/media/aOiiut0WA77nYsDddq/giphy.gif"
        alt="welcome"
      />
      <Link to="/home">
        <Button color="purple">Ingresar</Button>
      </Link>
    </section>
  );
}
