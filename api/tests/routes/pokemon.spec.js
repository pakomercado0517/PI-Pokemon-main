/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { v4 } = require("uuid");
const { Pokemon, conn } = require('../../src/db.js');


const agent = session(app);
const pokemon = {
  id: v4(),
  name: 'Pikachu',
  hp: 65,
  attack: 68,
  defense: 92,
  speed: 92,
  height: 92,
  weight: 129,
  sprite: 'https://cdn2.vectorstock.com/i/1000x1000/73/91/pokemon-logo-icon-template-vector-23237391.jpg',
  createdInDb: true,
  types: ['electric'],
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  afterEach(() => {
    Pokemon.sync({ force: true });
  });
  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect(200));
  });
  describe("GET /pokemons?name='parametro'", () => {
    it("debe retornar 200", () =>
      agent.get("/pokemons?name=pikachu").expect(200));
  });

  describe("GET /pokemons/:id", function () {
    it("responde con 404 cuando la página no existe", function () {
      return agent.get("/pokemons/pp").expect(404);
    });
    it("responde con 200 cuando la página existe", function () {
      let pokemon = Pokemon.create({
        id: v4(),
        name: "pikachu",
        hp: 65,
        attack: 68,
        defense: 92,
        speed: 92,
        height: 92,
        weight: 129,
        sprite: 'https://cdn2.vectorstock.com/i/1000x1000/73/91/pokemon-logo-icon-template-vector-23237391.jpg',
        createdInDb: true,
        types: ['fire', 'rock'],
      }).then(() => {
        return agent.get("/pokemons/" + pokemon.id).expect(200);
      });
    });
  });
});




