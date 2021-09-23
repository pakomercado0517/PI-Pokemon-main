const { Router }= require('express')
const axios= require('axios')
const router= Router()
const { Pokemon, Type }= require('../db')

//Obtenemos los pokemons de la API
const getPokeAPI= async ()=> {
  
  try {
    const firstPokemons= await axios.get('https://pokeapi.co/api/v2/pokemon') //Lo utilizamos para traer los primeros pokemones//
    const secondPokemons= await axios.get(firstPokemons.data.next) //y resolvemos los siguientes pokemones
    const totalPokemons= firstPokemons.data.results.concat(secondPokemons.data.results) //unimos el resultado de las peticiones en una variable
    const pokeUrl= totalPokemons.map(el=> axios.get(el.url)) //Obtengo la url con la info de cada pokemon
    let pokeInfo= Promise.all(pokeUrl) //Paso en un arreglo de promesas con la respuesta de cada url con la información.
      .then(el=> {
        let pokemon= el.map(e=> e.data) //Obtengo la data de cada pokemon
        let info=[] //Creo un array vacio para guardar la data de cada pokemon
        pokemon.map(el=> {
          //Guardamos la info del pokemon en el array...
          info.push({
            id: el.id,
            name:el.name,
            hp: el.stats[0].base_stat,
            attack:el.stats[1].base_stat,
            defense: el.stats[2].base_stat,
            speed: el.stats[5].base_stat,
            height: el.height,
            weight:el.weight,
            sprite: el.sprites.other.dream_world.front_default,
            types: el.types.length < 2 ? [{name: el.types[0].type.name}] : [{name: el.types[0].type.name}, {name:el.types[1].type.name}]
          })
        })
        return info
      }).catch(error=> console.log(error))
      return pokeInfo
  }catch(error){
    throw error
  }
  }
//Obtenemos los datos de los pokemon en la base de datos
const getpokeDb= async()=> {
  try {
    return await Pokemon.findAll({
      include: {
        model: Type,
        attributes:['name'],
        through: {
          attributes: [],
        },
      }
    })
  } catch(error) {
    console.error('Something went wrong')
    console.error(error)
  }
}

//Unimos los datos de la API con la base de datos

const allPokemons= async ()=> {
  const api= await getPokeAPI()
  const db= await getpokeDb()
  const result= api ? api.concat(db) : ''
  return result
}

// Routes

router.get('/', async (req,res)=> {
  const { name }= req.query
  const pokeTotal= await allPokemons()
  try {
    if(name) {
      let pokeName= await pokeTotal.find(el=> el.name.toLowerCase() === name.toLowerCase())
      if(pokeName === undefined) {
        return res.status(404).send('Pokemon not found')
      }else {
        return res.status(200).json(pokeName)
      }
    } else {
      res.status(200).json(pokeTotal)
    }
  } catch(error) {
    throw error;
  }
})

router.get('/:id', async (req,res)=> {
  const {id}= req.params
  const pokeTotal= await allPokemons()
  try {
    if(id) {
      const pokeId= pokeTotal.find(el=> el.id == id)
      pokeId ?
      res.status(200).json(pokeId) :
      res.status(400).send('Pokemon not found')
    }
  } catch(error) {
    throw error
  }
})

router.post('/', async (req, res)=> {
  const { name, hp, attack, defense, speed, height, weight, sprite, createInDb, types}= req.body

  try {
    if(name) {
      const createPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        sprite,
        createInDb
      })
      const createDb= await Type.findAll({
        where: {
          name: types
        }
      })
      createPokemon.addType(createDb)
      return res.status(200).send('Pokemon succefuly created')
    }else{
      return res.status(404).send('Pokemon was not created')
    }
  }catch(error) {
    throw error
  }
})

module.exports= router;

