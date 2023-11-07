import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Welcome from "./pages/Welcome";
import CreatePokemon from "./pages/CreatePokemon";
import PokemonNavbar from "./components/PokemonNavbar";
function App() {
  return (
    <>
      <PokemonNavbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createpokemon" element={<CreatePokemon />} />
      </Routes>
    </>
  );
}

export default App;
