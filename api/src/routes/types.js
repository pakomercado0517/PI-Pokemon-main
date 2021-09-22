const {Router}= require('express')
const axios= require('axios')
const {Type}= require('../db')

const router= Router()

router.get('/', async (req,res)=> {
  const normalType= await Type.findOne({where:{name:'normal'}})

  if(!normalType) {
    try {
      const types= await axios.get('https://pokeapi.co/api/v2/type')
      const totalTypes= types.data.results.map(el=> el.name)
      const createTypes= totalTypes.map(async el=> await Type.create({name: el}))
      return res.status(200).send(createTypes)
    } catch (error) {
      res.status(404).send('error', error)
    }
  }else {
    const types= await Type.findAll()
    const totalTypes= types.map(el=> el.name)
    return res.status(200).send(totalTypes)
  }
})

module.exports= router;

