const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { v4 } = require("uuid");


describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name errors", () => {
      it("should throw an error if name are null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("requierd name ")))
          .catch(() => done());
      });
      it("should throw an error if title is null", (done) => {
        Pokemon.create({ name: null })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
    describe("Creating pokemon", () => {
      it("should work when its a valid name", () => {
        Pokemon.create({
          name: "Pokachu",
        }).then(() => done());
      });

      it("should return the pokemon created", async () => {
        let temp = await Pokemon.create({
          id: v4(),
          name: "Charmander",
          hp: 65,
          attack: 68,
          defense: 92,
          speed: 92,
          height: 92,
          weight: 129,
          sprite: 'https://cdn2.vectorstock.com/i/1000x1000/73/91/pokemon-logo-icon-template-vector-23237391.jpg',
          createdInDb: true,
          types: ['fire', 'rock'],
        });
        expect(temp.name).to.equal("Charmander");
        expect(temp.defense).to.equal(92);
        expect(temp.speed).to.equal(92);
      });
    });

  });
});
})