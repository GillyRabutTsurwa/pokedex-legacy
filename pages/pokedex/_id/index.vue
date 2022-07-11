<template>
  <div class="about-pokemon" v-bind:style="{backgroundColor: `rgb(${imgBackgroundColour})`, color: `rgb(${imgFontColour})`}">
    <div class="about-pokemon__title">
      <h2 class="about-pokemon__title--title">About {{name}}</h2>
    </div>

    <div class="about-pokemon__types">
      <h3 class="about-pokemon__types--title">{{typeSubtitle}}:</h3>
      <ul class="about-pokemon__types--list">
        <li v-for="currentType in types" v-bind:key="currentType">
          {{currentType}}
        </li>
      </ul>
    </div>

    <div class="about-pokemon__ability">
      <h3 class="about-pokemon__ability--title">Prime Abilities:</h3>
      <ul class="about-pokemon__ability--list">
        <li v-for="currentAbility in abilities" v-bind:key="currentAbility">
          {{currentAbility}}
        </li>
      </ul>
    </div>

    <div v-bind:style="{backgroundColor: `rgb(${imgBackgroundColour})`}" class="pokemon-image">
      <img @load="imgVibez" v-bind:src="imgURL" alt="name" crossorigin="annonymous">
    </div>

    <div class="about-pokemon__moves">
      <h3 class="about-pokemon__moves--title">{{moveSubtitle}}</h3>
      <ul class="about-pokemon__moves--list">
        <li v-for="currentMove in moves" v-bind:key="currentMove">
          {{currentMove}}
        </li>
      </ul>
    </div>

    <div class="about-pokemon__stats">
      <h3 class="about-pokemon__stats--title">Stats</h3>
      <Chart :types="statTypes" :figures="statFigures" :fontColour="imgFontColour" />
    </div>

    <!-- <div class="about-pokemon__moves">
      <h3 class="about-pokemon__moves--title">{{moveSubtitle}}</h3>
      <ul class="about-pokemon__moves--list">
        <li v-for="currentMove in moves" v-bind:key="currentMove">
          {{currentMove}}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import ColorThief from "colorthief";
import PokeBall from "@/components/shared/PokeBall";
import Chart from "@/components/shared/Chart";
export default {
  name: "PokemonPage",
  components: {
    PokeBall: PokeBall,
    Chart: Chart,
  },
  data() {
    return {
      imgBackgroundColour: "",
      imgFontColour: "",
    };
  },
  methods: {
    imgVibez() {
      const colorThief = new ColorThief();
      const img = document.querySelector(".pokemon-image img");
      console.log(img);
      if (img.complete) {
        console.log(colorThief.getPalette(img));
        let primaryColour = colorThief.getPalette(img)[0];
        let primaryColourValue = primaryColour.join(",");
        let fontColour = colorThief.getPalette(img)[2];
        let fontColourValue = fontColour.join(",");
        console.log(fontColourValue);
        this.imgBackgroundColour = primaryColourValue;
        this.imgFontColour = fontColourValue;
      } else {
        colorThief.getColor(img);
      }
    },
  },

  async asyncData(context) {
    const name = context.route.params.id;
    const URL = "https://pokeapi.co/api/v2/pokemon";
    const data = await context.$axios.$get(`${URL}/${name}`);

    // using destructuring pour nettoyer le code
    const { id, abilities, moves, types, stats } = data;
    const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    const pokemonAbilities = abilities.map(
      (currentAbilityObj) => currentAbilityObj.ability.name
    );

    const pokemonMoves = moves
      .slice(0, 10)
      .map((currentMoveObj) => currentMoveObj.move.name);

    const moveSubtitle =
      pokemonMoves.length >= 10
        ? `Top ${pokemonMoves.length} moves`
        : "Top Moves";

    const pokemonTypes = types.map(
      (currentTypeObj) => currentTypeObj.type.name
    );

    const typeSubtitle = pokemonTypes.length > 1 ? "Types" : "Type";

    const pokemonStats = stats.map((currentStatsObj) => [
      currentStatsObj.stat.name,
      currentStatsObj.base_stat,
    ]);

    const statTypes = pokemonStats.map((currentStatsArr) => {
      return currentStatsArr[0];
    });
    const statFigures = pokemonStats.map((currentStatsArr) => {
      return currentStatsArr[1];
    });

    return {
      name: name,
      id: id,
      abilities: pokemonAbilities,
      moves: pokemonMoves,
      moveSubtitle: moveSubtitle,
      types: pokemonTypes,
      typeSubtitle: typeSubtitle,
      statTypes: statTypes,
      statFigures: statFigures,
      imgURL: imgURL,
    };
  },
};
</script>

<style lang="scss" scoped>
.pokemon-image {
  width: 70rem;
  height: 70rem;
  grid-column: 1 / 2;
  grid-row: 3 / 4;

  img {
    width: 100%;
    height: 100%;
  }
}
.about-pokemon {
  font-size: 1.6rem;
  display: grid;
  // grid-template-columns: repeat(2, 1fr);
  //TESTING
  grid-template-columns: 1fr min-content 1fr;
  grid-template-rows: repeat(2, min-content) 1fr;
  row-gap: 1.5rem;
  place-items: center;
  padding-top: 4rem;
  & [class*="title"] {
    text-transform: uppercase;
  }
  ul {
    list-style: none;
  }
  &__title {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    &--title {
      font-size: 3.5rem;
      text-align: center;
      text-transform: uppercase;
      font-family: Poppins, sans-serif;
      letter-spacing: 0.25rem;
      grid-column: 1 / -1;
    }
    &--back {
      position: fixed;
      top: 2rem;
      right: 2rem;
      transition: transform 0.5s ease;
      &:hover {
        transform: rotate(360deg);
      }
    }
  }

  .pokeball__btn {
  }

  &__types,
  &__ability {
    display: flex;
    align-items: center;
    ul {
      margin-left: 1rem;
      li {
        margin-right: 1rem;
        text-transform: uppercase;
        font-size: 1.25rem;
        font-weight: 500;
      }
    }
  }
  &__types {
    grid-column: 1 / 2;
    display: flex;

    &--list {
      display: flex;
    }
  }
  &__ability {
    grid-column: 3 / 4;
    grid-row: 2 / 3;

    &--list {
      display: flex;
    }
  }
  &__stats {
    grid-column: 3 / 4;
    grid-row: 3 / 4;
    &--title {
      text-align: center;
    }
  }
  &__moves {
    grid-column: 2 / 3;
    grid-row: 2 / 4;
    text-align: center;
    align-self: start;

    &--title {
      margin: 2rem 4rem;
      font-size: 5rem;
    }

    &--list {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: space-around;

      li {
        margin-bottom: 3rem;
      }
    }
  }
}
</style>