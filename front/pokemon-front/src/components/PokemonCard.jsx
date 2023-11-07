/* eslint-disable react/prop-types */
import { Card } from "flowbite-react";
import useTypeIcons from "../hooks/useTypeIcons";
import useCardClasses from "../hooks/useCardClasses";

// eslint-disable-next-line react/prop-types
export default function PokemonCard({ item }) {
  const iconTypes = useTypeIcons();
  const cardClasses = useCardClasses();

  const imageRendered = () => {
    return (
      <div className="w-[300px] bg-white rounded-md border-double border-8 border-gray-400 m-5 flex justify-center">
        <img
          src={item.sprite}
          alt="sprite"
          className="w-44 h-44 p-6 flex self-center "
        />
      </div>
    );
  };

  const typesRendered = () => {
    return (
      <div>
        <div className="flex flex-row justify-end absolute top-48 right-6">
          {item.types.map((type) => {
            const iconData = iconTypes[type.name];
            return (
              <div key={type.id} className={`${iconData.class} ml-1`}>
                <img src={iconData.icon} alt="type" className="w-8 h-8  p-1 " />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const typeItem = item.types[0]?.name;

  return (
    <section className={`p-3 bg-gray-700 rounded-md relative`}>
      {typesRendered()}
      <Card
        className={`w-[340px] ${cardClasses[typeItem].styleClass}`}
        renderImage={imageRendered}
      >
        {/* <img src={item.sprite} alt="sprite" className="w-1/3" /> */}
        <h5
          className={`text-3xl font-extrabold tracking-tight text-center text-white`}
        >
          {item.name.toUpperCase()}
        </h5>
        <div className="max-w-sm">
          <div className="grid grid-cols-2 justify-items-center">
            <div className="">
              <div className="w-[150px] p-1 border border-sm border-r-0 border-gray-800">
                <h3 className="text-center font-bold  text-white">Fuerza</h3>
              </div>
              <div className="w-[150px] p-1 border border-sm border-gray-800 bg-white">
                <p className="text-center ml-2 text-gray-600">{item.hp}</p>
              </div>
            </div>

            <div className="">
              <div className="text-center w-[150px] p-1 border border-sm border-gray-800">
                <h3 className="font-bold text-white">Ataque</h3>
              </div>
              <div className="w-[150px] p-1 border border-sm border-gray-800 bg-white">
                <p className="text-center ml-2 text-gray-600">{item.attack}</p>
              </div>
            </div>

            <div className="">
              <div className="text-center w-[150px] p-1 border border-r-0 border-sm border-gray-800">
                <h3 className="font-bold text-white">Defensa</h3>
              </div>
              <div className="w-[150px] p-1 border border-sm border-gray-800 bg-white">
                <p className="text-center ml-2 text-gray-600">{item.defense}</p>
              </div>
            </div>

            <div className="">
              <div className="w-[150px] p-1 border border-sm border-gray-800">
                <h3 className="text-center font-bold text-white">Velocidad</h3>
              </div>
              <div className="w-[150px] p-1 border border-sm border-gray-800 bg-white">
                <p className="text-center ml-2 text-gray-600">{item.speed}</p>
              </div>
            </div>

            <div className="">
              <div className="w-[150px] p-1 border border-r-0 border-sm border-gray-800">
                <h3 className="text-center font-bold text-white">Peso</h3>
              </div>
              <div className="w-[150px] p-1 border border-sm border-gray-800 bg-white">
                <p className="text-center ml-2 text-gray-600">{item.weight}</p>
              </div>
            </div>

            <div className="">
              <div className="w-[150px] p-1 border border-sm border-gray-800">
                <h3 className=" font-bold text-center text-white">Tipo</h3>
              </div>
              <div className="w-[150px] p-1 border border-sm border-gray-800 bg-white">
                <p className=" ml-2 text-gray-600 text-center">
                  {item.types.map((type) => type.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
