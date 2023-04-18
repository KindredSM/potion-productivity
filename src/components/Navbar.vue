<template>
  <nav>
    <ul class="user">
      <button @click="signInWithGoogle" class="sign-in">Sign in</button>
      <button @click="signOut" class="sign-out">Sign Out</button>
    </ul>
  </nav>
</template>

<script lang="ts">
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "../firebase";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export default {
  methods: {
    async signInWithGoogle() {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in:", user);
      } catch (error) {
        console.error("Error signing in:", error);
      }
    },
    async signOut() {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  },
};
</script>

<style scoped>
nav {
  position: fixed;
  width: 100%;
  z-index: 1;
  top: 10px;
  right: 50px;
  display: flex;
  height: 90px;
  align-items: center;
}

.user {
  position: absolute;
  right: 0;
}
.sign-in {
  background-color: #282828;
}
</style>
