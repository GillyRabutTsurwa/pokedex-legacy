<template>
  <div>
    <!-- Show navigation except in the homepage a.k.a name="index" a.k.a fullPath="/" -->
    <!-- I'm doing this as an override pour afficher la navigation apres les pokemon sont chargées (après qq' secondes) -->
    <!-- <Navigation v-if="routeName !== 'index'" class="nav" /> -->
    <Navigation class="nav" />
    <Nuxt class="main" />
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
export default {
  data() {
    return {
      routeName: this.$route.name,
    };
  },
  components: {
    Navigation: Navigation,
  },
  created() {
    console.log(this.$route);
  },
};
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  min-height: 100%;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 62.5%;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

body {
  /* background-color: palegoldenrod; */
  background-color: antiquewhite;
}

.main {
  height: 100vh;
  /* padding: 5rem 0; il semble que j'en ai pas besoin */
}

.nav {
  position: fixed;
  top: 2rem;
}

.fixed {
  position: fixed;
  top: 0;
  left: 0;
  padding: 2rem;
}

button,
a {
  display: inline-block;
  padding: 1rem 3rem;
  font-size: 1.6rem;
  text-decoration: none;
  border-radius: 4px;
}

.button--green {
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  border: 1px solid #35495e;
  color: #35495e;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.button--pokedex {
  background-color: #333;
  color: rgb(230, 189, 86);
}

.button--pokedex:hover {
  background-color: rgb(230, 189, 86);
  color: #333;
}
</style>
