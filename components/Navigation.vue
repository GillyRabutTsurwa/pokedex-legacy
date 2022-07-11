<template>
  <nav class="navigation">
    <nuxt-link to="/">
      <Logo class="navigation__logo" />
    </nuxt-link>
    <NuxtLink to="/pokedex">
      <PokeBall class="path draw" />
    </NuxtLink>
  </nav>
</template>

<script>
import Logo from "./shared/Logo";
import PokeBall from "./shared/PokeBall";
export default {
  components: {
    Logo: Logo,
    PokeBall: PokeBall,
  },
};
</script>

<style>
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
  height: 7.5rem;
  z-index: 1000;
  /* background-color: #42b883; */
}

.navigation a {
  padding: unset;
}

.navigation__logo {
  width: 15rem;
  height: 15rem;
}

.navigation__list {
  display: flex;
  list-style-type: none;
}

.navigation__list--item {
  margin: 0 1rem;
}

.navigation__list--item a:link,
.navigation__list--item a:visited {
  text-decoration: none;
  color: #e2f7fa;
  text-transform: uppercase;
  font-size: 1.8rem;
  font-size: bold;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid transparent;

  transition: border-bottom 0.3s ease-in;
}

.navigation__list--item a:hover,
.navigation__list--item a:active {
  border-bottom: 2px solid #e2f7fa;
}
</style>