import water from "../assets/icons/water.svg";
import bug from "../assets/icons/bug.svg";
import dark from "../assets/icons/dark.svg";
import dragon from "../assets/icons/dragon.svg";
import electric from "../assets/icons/electric.svg";
import fairy from "../assets/icons/fairy.svg";
import fighting from "../assets/icons/fighting.svg";
import fire from "../assets/icons/fire.svg";
import flying from "../assets/icons/flying.svg";
import ghost from "../assets/icons/ghost.svg";
import grass from "../assets/icons/grass.svg";
import ground from "../assets/icons/ground.svg";
import ice from "../assets/icons/ice.svg";
import normal from "../assets/icons/normal.svg";
import poison from "../assets/icons/poison.svg";
import psychic from "../assets/icons/psychic.svg";
import rock from "../assets/icons/rock.svg";
import steel from "../assets/icons/steel.svg";

export default function useTypeIcons() {
  const iconTypes = {
    water: {
      icon: water,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-water shadow-md shadow-water ring-2 transition-all rounded-full bg-water",
    },
    bug: {
      icon: bug,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-bug shadow-bug shadow-md ring-2 rounded-full bg-bug",
    },
    dark: {
      icon: dark,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-dark shadow-dark ring-2 shadow-md rounded-full bg-dark",
    },
    dragon: {
      icon: dragon,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-dragon shadow-dragon ring-2 shadow-md rounded-full bg-dragon",
    },
    electric: {
      icon: electric,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-electric shadow-electric ring-2 shadow-md rounded-full bg-electric",
    },
    fairy: {
      icon: fairy,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-fairy shadow-fairy ring-2 shadow-md shadow-fairy rounded-full bg-fairy",
    },
    fighting: {
      icon: fighting,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-fighting shadow-fighting ring-2 shadow-md rounded-full bg-fighting",
    },
    fire: {
      icon: fire,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-fire shadow-fire ring-2 shadow-md rounded-full bg-fire",
    },
    flying: {
      icon: flying,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-flying shadow-flying ring-2 shadow-md rounded-full bg-flying",
    },
    ghost: {
      icon: ghost,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-ghost shadow-ghost ring-2 shadow-md rounded-full bg-ghost",
    },
    grass: {
      icon: grass,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-grass shadow-grass ring-2 shadow-md rounded-full bg-grass",
    },
    ground: {
      icon: ground,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-ground shadow-ground ring-2 shadow-md rounded-full bg-ground",
    },
    ice: {
      icon: ice,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-ice shadow-ice ring-2 shadow-md rounded-full bg-ice",
    },
    normal: {
      icon: normal,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-normal shadow-normal ring-2 shadow-md rounded-full bg-normal",
    },
    poison: {
      icon: poison,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-poison shadow-poison ring-2 shadow-md rounded-full bg-poison",
    },
    psychic: {
      icon: psychic,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-psychic shadow-psychic ring-2 shadow-md rounded-full bg-psychic",
    },
    rock: {
      icon: rock,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-rock shadow-rock ring-2 shadow-md rounded-full bg-rock",
    },
    steel: {
      icon: steel,
      class:
        "w-12 h-12 m- flex justify-center items-center border border-steel shadow-steel ring-2 shadow-md rounded-full bg-steel",
    },
  };
  return iconTypes;
}
