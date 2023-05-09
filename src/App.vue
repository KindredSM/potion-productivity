<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "./store/userStore";
import { usePagesStore } from "./store/pageStore";
import { auth, onAuthStateChanged } from "./firebase";
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Navbar,
  },
  created() {
    const pagesStore = usePagesStore();
    pagesStore.fetchUserData();
    // Check the user's authentication state when the component is created
    onAuthStateChanged(auth, (user) => {
      const userStore = useUserStore(); // Move the useUserStore() call inside the callback
      if (user) {
        console.log("User is signed in.");
        userStore.setUser(user); // Update the user store
      } else {
        console.log("User is signed out.");
        userStore.setUser(null); // Clear the user store
      }
    });
  },
};
</script>

<template>
  <navbar />
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
