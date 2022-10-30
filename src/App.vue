<template>
  <h1 class="header">Potion</h1>
  <input type="text" class="search" placeholder="Search Potion..." />
  <nav>
    <router-link
      v-for="(label, index) in labels"
      v-bind:key="label"
      href="#"
      @remove="removeTask(index)"
      v-bind:to="'/note/' + label"
      v-bind:style="{
        selected: label === selected,
      }"
    >
      {{ label }} <button class="delete" @click="$emit('remove')">X</button>
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
    removeTask: function (index) {
      this.items.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
$textColor: #e1e1e1;
$primaryColor: #1f1f1f;
$highlightColor: #323232;
$darkenColor: rgb(174, 174, 174);

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
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 700;
}
.search {
  background: $highlightColor;
  outline: none;
  box-shadow: none;
  border-radius: 2px;
  width: 11rem;
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
    .delete {
      border: none;
      border-radius: 2px;
      position: absolute;
      font-weight: 900;
      color: #e1e1e1;
      background: none;
      margin-left: 9rem;
      cursor: pointer;
    }
    .delete:hover {
      background: rgb(0, 0, 0);
    }
  }

  .new-page {
    position: fixed;
    left: 2rem;
    bottom: 10vh;
    font-size: 1rem;
    margin-top: 500px;
    color: $textColor;
    width: 7rem;
    height: 3rem;
    background-color: $highlightColor;
    outline: none;
    box-shadow: none;
    border: 1px #1f1f1f solid;
    cursor: pointer;
    font-weight: 700;
    transition: ease-in-out 0.1s;

    &:hover {
      transform: scale(1.01);
      color: $darkenColor;
    }
  }
}
</style>
