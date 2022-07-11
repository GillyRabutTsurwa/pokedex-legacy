const state = () => {
  return {
    pokemon: [],
  };
};

const getters = {
  getPokemon(state) {
    return state.pokemon;
  },
};

const mutations = {
  setPokemonData(state, dataPayload) {
    state.pokemon = dataPayload;
  },
};

const actions = {
  async fetchPokemonData(context) {
    // NOTE: le defaut, après le API, c'est 100000
    const limit = 150;
    const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;

    const response = await fetch(URL);
    const data = await response.json();

    const results = data.results;
    const pokemonData = results.map(async (currentPokemon) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${currentPokemon.name}`
      );

      const data = await response.json();
      return data;
    });

    const wrappedPokemonData = Promise.all(pokemonData);
    console.log(wrappedPokemonData);
    const finalPokemonData = await wrappedPokemonData;
    console.log(finalPokemonData);

    return wrappedPokemonData;
  },
};

export default {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
