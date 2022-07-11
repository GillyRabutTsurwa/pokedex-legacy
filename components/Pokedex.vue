<template>
  <div class="pokecards">
    <PokeCard @hook:mounted="testingHookEvent" v-for="(currentPokemon, index) in cardsProp" v-bind:key="index" v-bind:pokemonObj="currentPokemon" />
  </div>
</template>

<script>
import PokeCard from "./PokeCard";
export default {
  name: "Pokedex",
  components: {
    PokeCard: PokeCard,
  },
  props: {
    cardsProp: {
      type: Array,
      required: true,
    },
  },
  methods: {
    // NEWTESTING: the hook event
    testingHookEvent() {
      // NEW: This is very cool: c'est comme j'ai trouvé un bijou: https://vuedose.tips/listen-to-lifecycle-hooks-on-third-party-vue-js-components
      // console.log("Je vais exectuer lorsque le Pokecard est monté ");
    },
  },
};
</script>

<style>
.pokecards {
  /* NOTEIMPORTANT: not .pokecard */
  width: 80%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 27.5rem));
  grid-auto-rows: 33.5rem;
  gap: 5rem;
  justify-content: center;
  overflow: hidden;
  padding: 2rem 1.5rem;
  margin: 0 auto;
}
</style>