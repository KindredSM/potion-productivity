<script lang="ts">
import Sidebar from "./components/Sidebar.vue";

export default {
  components: { Sidebar },
};
</script>

<template>
  <sidebar />
  <router-view />
</template>

<style scoped>
* {
  font-family: "Poppins";
  padding: 0;
  margin: 0;
  border: 0;
  color: white;
}

a {
  color: inherit;
  text-decoration: none;
}

#app {
  width: 100%;
  height: 100%;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  width: 100%;
}
body {
  height: 100%;
  width: 100%;
}

button {
  cursor: pointer;
}
input,
textarea,
button,
select,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
</style>
