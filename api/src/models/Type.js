const { DataTypes }= require('sequelize')

module.exports= (sequelize)=> {
  //definimos el modelo y lo exportamos
  sequelize.define('type', {
    name: {
      type:DataTypes.STRING,
    },
  })
}