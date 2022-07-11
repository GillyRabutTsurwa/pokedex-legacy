<template>
  <div class="pokedex-page-container">
    <PokeBall v-if="$fetchState.pending" class="pokeball__loading path draw" />
    <h4 v-if="$fetchState.error">ERROR</h4>

    <!-- v-if isLoading seems a bit hacky, mais ca marche. peut-être je vais trouver une autre solution +tard -->
    <div v-else>
      <Pokedex ref="pokedex" v-bind:cardsProp="currentCards" />
      <Pagination :cardsPerPageProp="cardsPerPage" :totalCardsProp="pokeData.length" @paginate-evt="paginate($event)" />
    </div>
  </div>
</template>

<script>
import PokeBall from "@/components/shared/PokeBall";
import Pagination from "@/components/Pagination";
import Pokedex from "@/components/Pokedex";
export default {
  name: "PokedexPage",
  components: {
    PokeBall: PokeBall,
    Pokedex: Pokedex,
    Pagination: Pagination,
  },
  data() {
    return {
      pokeData: [],
      isLoading: null,
      currentPage: 1,
      cardsPerPage: 8,
    };
  },
  computed: {
    // these 4 computed properties are for pagination
    // pokeData() {
    //   return this.$store.getters.getPokemon;
    // },
    indexOfLastPost() {
      return this.currentPage * this.cardsPerPage;
    },
    indexOfFirstPost() {
      return this.indexOfLastPost - this.cardsPerPage;
    },
    currentCards() {
      return this.pokeData.slice(this.indexOfFirstPost, this.indexOfLastPost);
    },

    // retrouvé du composant Pokedex.vue
    pokedexLoadingClasses() {
      return {
        "container-on-load": this.isLoading,
      };
    },
  },
  methods: {
    // method that takes data coming from child
    paginate(currentPageNumber) {
      this.currentPage = currentPageNumber;
    },
  },

  async fetch() {
    const pokemonPromises = this.$store.dispatch("fetchPokemonData");
    const pokemonData = await pokemonPromises;

    this.pokeData = pokemonData.map((currentPokemon) => {
      return currentPokemon;
    });
  },
  mounted() {
    const g = this.$options.components["Pokedex"];
    console.log(g);
  },
};
</script>

<style lang="scss">
.pokedex-page-container {
  display: grid;
  grid-template-rows: min-content 80vh 1fr;
  place-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 6rem 4rem;
  background-image: linear-gradient(to bottom right, rgba(60, 148, 148, 0.8), rgba(114, 222, 187));
}

// from pokedex.vue
.pokeball__loading {
  width: 50rem;
  height: 50rem;
}

/* classe dynamique, retrouver de Pokedex.vue */
.container-on-load {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

//TESTING
.pokeball-btn {
  justify-self: end;
}
</style>