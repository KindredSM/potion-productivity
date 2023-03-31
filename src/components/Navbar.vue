<template>
  <nav>
    <router-link to="/">
      <!-- <img src="public/logo.svg" alt="logo" class="logo" /> -->
      <p class="nav-header">Potion</p>
    </router-link>
  </nav>
</template>

<style>
.nav-header {
  font-weight: 900;
  background: linear-gradient(215.78deg, #ff5d2b 2.99%, #ffb800 104.97%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-top: 12px;
  margin-left: 20px;
  font-size: 24px;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5;
  display: flex;
  height: 75px;
  align-items: center;
}
</style>
