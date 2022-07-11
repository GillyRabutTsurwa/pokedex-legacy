import Vuex from "vuex";
import pokemon from "./modules/pokemon";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      pokemon: pokemon,
    },
  });
};

export default createStore;
