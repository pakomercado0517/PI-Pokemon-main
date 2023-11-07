const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Pokemon, Type } = require("../db");

//Obtenemos los pokemons de la API
const getPokeAPI = async () => {
  try {
    const firstPokemons = await axios.get("http://pokeapi.co/api/v2/pokemon", {
      timeout: 90000,
    }); //Lo utilizamos para traer los primeros pokemones//
    const secondPokemons = await axios.get(firstPokemons.data.next); //y resolvemos los siguientes pokemones
    const totalPokemons = firstPokemons.data.results.concat(
      secondPokemons.data.results
    ); //unimos el resultado de las peticiones en una variable
    const pokeUrl = totalPokemons.map((el) => axios.get(el.url)); //Obtengo la url con la info de cada pokemon
    let pokeInfo = Promise.all(pokeUrl) //Paso en un arreglo de promesas con la respuesta de cada url con la información.
      .then((el) => {
        let pokemon = el.map((e) => e.data); //Obtengo la data de cada pokemon
        let info = []; //Creo un array vacio para guardar la data de cada pokemon
        pokemon.map((el) => {
          //Guardamos la info del pokemon en el array...
          info.push({
            id: el.id,
            name: el.name,
            hp: el.stats[0].base_stat,
            attack: el.stats[1].base_stat,
            defense: el.stats[2].base_stat,
            speed: el.stats[5].base_stat,
            height: el.height,
            weight: el.weight,
            sprite: el.sprites.other.dream_world.front_default,
            types:
              el.types.length < 2
                ? [{ name: el.types[0].type.name }]
                : [
                    { name: el.types[0].type.name },
                    { name: el.types[1].type.name },
                  ],
          });
        });
        return info;
      })
      .catch((error) => console.log(error));
    return pokeInfo;
  } catch (error) {
    throw error;
  }
};
//Obtenemos los datos de los pokemon en la base de datos
const getPokeDb = async () => {
  try {
    return await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.error("Something went wrong");
    console.error(error);
  }
};

// Obtenemos la imagen de un pokemon al crearlo...

const getNameUrl = async (name) => {
  try {
    const pokeUrl = await axios.get(`http://pokeapi.co/api/v2/pokemon/${name}`);
    return pokeUrl.data.sprites.other.dream_world.front_default;
  } catch (error) {
    console.error("me lleva!!!", error);
  }
};

//Unimos los datos de la API con la base de datos

const allPokemons = async () => {
  const api = await getPokeAPI();
  const db = await getPokeDb();
  const result = api ? api.concat(db) : "";
  return result;
};

let pokeCache = []; //creamos una memoria cache para evitar errores al cargar pokemones...

// Routes

router.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    const pokeTotal = await allPokemons();
    //verificamos si hay algun pokemon nuevo...
    pokeTotal.length > pokeCache.length
      ? (pokeCache = pokeTotal.slice(0, pokeTotal.length))
      : pokeCache;

    if (name) {
      let pokeName = await pokeCache.find(
        (el) => el.name.toLowerCase() === name.toLowerCase()
      );
      if (pokeName !== undefined) {
        console.log(pokeName);
        return res.status(200).json(pokeName);
      } else {
        return res.status(201).json({ error: true });
      }
    } else {
      return res.status(202).json(pokeCache);
    }
  } catch (error) {
    return res.status(404).send("El get/home valió...");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let pokeTotal;
    if (id.length > 9) {
      pokeId = await getPokeDb();
      pokeTotal = pokeId.find((el) => el.id === id);
    } else {
      pokeTotal = pokeCache.find((el) => el.id === parseInt(id));
    }
    if (id) {
      let pokeId = isNaN(pokeTotal) || pokeTotal.length > 0 ? pokeTotal : [];
      res.status(200).json(pokeId);
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    throw error;
  }
});

router.get("/search/:name", async (req, res) => {
  const { name } = req.params;
  const pokeUrlData = await getNameUrl(name);
  try {
    if (name) {
      return res.status(200).json(pokeUrlData);
    } else {
      return res.status(400).send("No cargo esa cosa...");
    }
  } catch (err) {
    res.status(400).send("No good!!...", err);
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    sprite,
    createInDb,
    types,
  } = req.body;

  try {
    if (name) {
      const createPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        sprite,
        createInDb,
      });
      const createDb = await Type.findAll({
        where: {
          name: types,
        },
      });
      createPokemon.addType(createDb);
      return res.status(200).send("Pokemon succefuly created");
    } else {
      return res.status(404).send("Pokemon was not created");
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
