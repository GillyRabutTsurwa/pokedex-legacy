<template>
  <div class="home-page">
    <PokeBall v-if="$fetchState.pending" class="lg spinnin pokeball" />
    <h4 v-else-if="$fetchState.error">Erreur</h4>

    <div v-else :style="{backgroundColor: `rgb(${colourPrimary})`}" class="container">
      <div :style="{backgroundColor: `rgb(${colourPrimary})`}" class="home-page-image">
        <img id="image" @load="getImageColour" :src="currentImg" alt="" crossorigin="anonymous" ref="pokemonImg">
      </div>

      <div class="links">
        <NuxtLink to="/about" target="_blank" rel="noopener noreferrer" class="button--pokedex">
          About App
        </NuxtLink>
        <NuxtLink to="/pokedex" :style="{backgroundColor: `rgb(${colourSecondary})`}" class="button--pokedex">
          Pokedex
        </NuxtLink>
        <a href="https://github.com/GillyRabutTsurwa" target="_blank" rel="noopener noreferrer" class="button--pokedex">
          GitHub
        </a>
      </div>

    </div>

  </div>
</template>
 
<script>
import ColorThief from "colorthief";
import Logo from "~/components/shared/Logo.vue";
import PokeBall from "~/components/shared/PokeBall";
export default {
  name: "Home",
  components: {
    Logo: Logo,
    PokeBall: PokeBall,
  },
  data() {
    return {
      isLoading: null,
      pokemonImages: [],
      randomArrIndex: 0,
      timer: 6000, // NOTE: in milliseconds. i finally found a way to use this variable
      colourPrimary: "",
      colourSecondary: "",
    };
  },
  computed: {
    pokemon() {
      return this.$store.getters.getPokemon;
    },
    pokeImages() {
      return this.$store.getters.getPokemonImages;
    },
    currentImg() {
      return this.pokemonImages[this.randomArrIndex];
    },
  },
  methods: {
    generateRandomIndex() {
      this.randomArrIndex = Math.floor(Math.random() * this.pokemonImages.length - 1);
    },
    renderImages() {
      setInterval(this.generateRandomIndex, this.timer);
    },
    // TESTING:
    getImageColour() {
      const colorThief = new ColorThief();
      // const img = document.querySelector("#image");
      const img = this.$refs.pokemonImg;

      if (img.complete) {
        let primaryColour = colorThief.getPalette(img)[0]; // pour background
        let primaryColourValue = primaryColour.join(",");

        let secondaryColour = colorThief.getPalette(img)[2]; // pour fonts and etc
        let secondaryColourValue = secondaryColour.join(",");

        this.colourPrimary = primaryColourValue;
        this.colourSecondary = secondaryColourValue;
      } else {
        colorThief.getColor(img);
      }
    },
  },
  async fetch() {
    const pokemonPromises = this.$store.dispatch("fetchPokemonData");
    const pokemonData = await pokemonPromises;

    this.pokemonImages = pokemonData.map((currentPokemon) => {
      return currentPokemon.sprites.other["official-artwork"].front_default;
    });
    console.log(this.pokemonImages);

    this.generateRandomIndex();
  },
  mounted() {
    this.renderImages();
  },
};
</script>

<style scoped>
.home-page {
  position: relative;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  /* display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center; */
}

.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* transition: background-color 2.5s ease-in; */
}

.home-page-image {
  width: 55rem;
  height: 55rem;
  /* transition: background-color 3s ease-in; */
}

.home-page img {
  width: 100%;
  height: 100%;
}
.pokemon-image {
  /* width: 100%;
  height: 100%; */
  width: 50rem;
  height: 50rem;
  /* transition: opacity 3s ease-in; */
}

/* TESTING */
.lg {
  width: 50rem;
  height: 50rem;
}
.spinnin {
  animation: spin 1.25s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.links {
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
}

.pokeball-main-page {
  position: absolute;
  top: 15%;
  left: 40%;
}
</style>