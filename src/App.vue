<template>
  <h1 class="header">Potion</h1>
  <input type="text" class="search" placeholder="Search Potion..." />
  <nav>
    <router-link
      v-for="label in labels"
      v-bind:key="label"
      href="#"
      v-bind:to="'/note/' + label"
      v-bind:style="{
        selected: label === selected,
      }"
    >
      {{ label }}
    </router-link>

    <!--
    <router-link to="/about">tomorrow</router-link>-->
    <button class="new-page" v-on:click="newNote">New Note</button>
  </nav>
  <router-view />
</template>

<script>
export default {
  computed: {
    labels() {
      console.log("store", this.$store);

      return this.$store.getters.labels;
    },
    selected() {
      console.log(this.$route.params);
      return this.$route.params.selected;
    },
  },
  methods: {
    newNote() {
      this.$store.commit("newNote");
    },
  },
};
</script>

<style lang="scss">
$textColor: #e1e1e1;
$primaryColor: #1f1f1f;
$highlightColor: #323232;

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;500;700&display=swap");

body {
  background-color: $primaryColor;
}

.header,
.search {
  font-weight: 500;
  position: sticky;
  position: absolute;
  left: 3%;
}

.header {
  position: fixed;
  font-size: 1.2rem;
  font-weight: 700;
}
.search {
  position: fixed;
  background: $highlightColor;
  outline: none;
  box-shadow: none;
  border-radius: 2px;
  width: 10rem;
  border: 1px #1f1f1f solid;
  top: 7%;
  height: 1.5rem;
  color: $textColor;
}
#app {
  font-family: Poppins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $textColor;
}

nav {
  font-size: 0.8rem;
  position: sticky;
  position: absolute;
  top: 20%;
  left: 3%;

  a {
    // position: fixed;
    width: 10rem;
    height: 1.2rem;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    padding: 0.5rem;
    text-decoration: none;
    font-weight: bold;
    color: $textColor;
    font-weight: 500;

    &.router-link-exact-active {
      background-color: $highlightColor;
      border-radius: 2px;
      font-weight: 700;
      // color: #87b5ff;
    }
  }
  .new-page {
    position: fixed;
    left: 2rem;
    bottom: 10vh;
    font-size: 1rem;
    margin-top: 500px;
    color: $textColor;
    width: 8rem;
    height: 3rem;
    background-color: $highlightColor;
    outline: none;
    box-shadow: none;
    border: 1px #1f1f1f solid;
    cursor: pointer;
    font-weight: 900;
  }
}
</style>
