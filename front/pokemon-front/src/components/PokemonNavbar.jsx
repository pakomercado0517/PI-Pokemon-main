import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function PokemonNavbar() {
  return (
    <Navbar className="bg-transparent shadow-lg mb-8" fluid rounded>
      <div>
        <Link to="/home">
          <img src={logo} alt="logo" className="w-48 h-18 " />
        </Link>
      </div>
    </Navbar>
  );
}
