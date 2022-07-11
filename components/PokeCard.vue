<template>
  <div class="pokecard">
    <div class="pokecard__title">{{pokemonObj.name}}</div>
    <div class="pokecard__image-container">
      <img v-bind:src="pokemonObj.sprites.front_default" alt="PokeKing">
    </div>
    <NuxtLink v-bind:to="`/pokedex/${pokemonObj.name}`" class="button--green">More Info</NuxtLink>
  </div>
</template>

<script>
import ColorThief from "colorthief";
export default {
  name: "PokeCard",
  props: {
    pokemonObj: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imgBackGroundClr: "",
    };
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss">
.pokecard {
  box-shadow: 7px 10px 12px -5px rgba(0, 0, 0, 0.55);
  text-align: center;
  background-color: #fff;
  border-radius: 3px;
  padding-bottom: 3.5rem;

  &__title {
    font-size: 2rem;
    text-transform: uppercase;
    margin-top: 2rem;
    letter-spacing: 5px;
  }
  &__image-container {
    background-color: #eceff1;
    height: 20rem;
    margin: 1.5rem 3rem;
    & img {
      width: 80%;
      height: 80%;
    }
  }
}
</style>