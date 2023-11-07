import { useState, useEffect } from "react";
import { Label, TextInput, Spinner, Button, Alert } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonApiInformation,
  createPokemon,
  cleanForm,
} from "../redux/actions";
import {
  HiInformationCircle,
  HiCheckCircle,
  HiExclamation,
} from "react-icons/hi";

export default function CreatePokemonForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [pokemonName, setPokemonName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [currentAlert, setCurrentAlert] = useState({
    message: "",
    color: "",
    icon: "",
  });

  const apiInformation = useSelector((state) => state.apiInformation);

  const handleChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleGetInformation = (e) => {
    e.preventDefault();
    dispatch(getPokemonApiInformation(pokemonName));
    setIsLoading(true);
    return setIsAlert(false);
  };

  const handleAddPokemon = (e) => {
    e.preventDefault();
    dispatch(createPokemon(formData));
    setCurrentAlert({
      message: "Pokemon agregado con éxito!",
      color: "success",
      icon: HiCheckCircle,
    });
    setIsAlert(true);
    setPokemonName("");
    dispatch(cleanForm());
  };

  console.log("formdata.length", formData);

  useEffect(() => {
    if (apiInformation.message === "Warning!, Pokemon exist on DB") {
      setCurrentAlert({
        message:
          "Atención! Este Pokemón ya se encuentra en la Base de Datos...",
        color: "warning",
        icon: HiInformationCircle,
      });
      setIsLoading(false);
      return setIsAlert(true);
    }

    if (apiInformation.status === 400) {
      setCurrentAlert({
        message:
          "Error! No se encontró el Pokemón, verifica si esta bien escrito el nombre...",
        color: "failure",
        icon: HiExclamation,
      });
      setIsLoading(false);
      return setIsAlert(true);
    }

    apiInformation.length !== 0 && setIsLoading(false);
    setFormData(apiInformation);
    setPokemonName("");
  }, [dispatch, apiInformation]);

  return (
    <section>
      <h1 className="text-xl font-bold text-center">Agrega un nuevo Pokemón</h1>
      <form className="mt-8 mx-3">
        <div className="max-w-lg mx-auto">
          <Label className="text-white">
            Ingresa el nombre del Pokemón para cargar su información.
          </Label>
          <TextInput name="name" value={pokemonName} onChange={handleChange} />
          <div className="flex gap-4 justify-center">
            <Button
              className="mt-2"
              onClick={handleGetInformation}
              gradientMonochrome="info"
            >
              Buscar Información
            </Button>
            <Button
              className="mt-2"
              color="purple"
              gradientMonochrome="purple"
              onClick={handleAddPokemon}
              disabled={formData.length === 0}
            >
              Agregar Pokemón
            </Button>
          </div>
        </div>
        <article className="flex justify-center mt-5">
          {isLoading ? (
            <div className="flex">
              <Spinner />
              <p className="ml-2">Cargando información...</p>
            </div>
          ) : (
            <></>
          )}
        </article>
        <article className="max-w-full h-24 mx-auto">
          {isAlert ? (
            <Alert
              color={currentAlert.color}
              withBorderAccent
              icon={currentAlert.icon}
            >
              {currentAlert.message}
            </Alert>
          ) : (
            <></>
          )}
        </article>
        <div className="grid grid-cols-3 gap-5 ">
          <div>
            <Label className="text-white">Nombre:</Label>
            <TextInput defaultValue={formData.name?.toUpperCase()} />
          </div>
          <div>
            <Label className="text-white">Fuerza:</Label>
            <TextInput defaultValue={formData.hp} />
          </div>
          <div>
            <Label className="text-white">Ataque:</Label>
            <TextInput defaultValue={formData.attack} />
          </div>
          <div>
            <Label className="text-white">Defensa:</Label>
            <TextInput defaultValue={formData.defense} />
          </div>
          <div>
            <Label className="text-white">Velocidad:</Label>
            <TextInput defaultValue={formData.speed} />
          </div>
          <div>
            <Label className="text-white">Altura:</Label>
            <TextInput defaultValue={formData.height} />
          </div>
          <div>
            <Label className="text-white">Peso:</Label>
            <TextInput defaultValue={formData.weight} />
          </div>
          <div>
            <Label className="text-white">Avatar:</Label>
            <TextInput defaultValue={formData.sprite} />
          </div>
          <div>
            <Label className="text-white">Tipos:</Label>
            <TextInput
              defaultValue={formData.types?.map((type) => type).join(", ")}
            />
          </div>
        </div>
      </form>
      <div className="flex justify-center">
        {formData.sprite ? (
          <img
            src={formData.sprite}
            className="w-44 h-44  border-4 border-purple-600 rounded-full mt-8 p-3"
            alt="sprite"
          />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
