<template>
  <nav>
    <ul class="user">
      <button @click="signInWithGoogle" class="sign-in" v-if="!user">
        Sign in
      </button>
      <button @click="signOut" class="sign-out" v-if="user">Sign Out</button>
    </ul>
  </nav>
</template>
<script>
import { useUserStore } from "../store/userStore";

export default {
  data() {
    const userStore = useUserStore();

    return {
      user: userStore.user,
    };
  },
  methods: {
    signInWithGoogle() {
      const userStore = useUserStore();
      userStore.signInWithGoogle();
      console.log("signed in");
    },
    signOut() {
      const userStore = useUserStore();
      userStore.signOut();
      console.log("signed out");
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
