<template>
  <div class="home">
    <div class="header-section">
      <img src="/src/svgs/logo.svg" alt="" class="logo" />
      <h1 class="header">Welcome to Potion.</h1>

      <p class="page-content">
        here, you can write notes that automatically save as you type them.<br />
        Open the sidebar and click "New Page" to start writing!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Home",
};
</script>

<style>
.home {
  padding-bottom: 120px;
  padding-top: 124px;
}

.logo {
  width: 100px;
}

.header-section {
  width: 100%;
  margin: 0 auto;
}
.header {
  background: linear-gradient(215.78deg, #ff5d2b 2.99%, #ffb800 104.97%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-align: center;
  font-size: 36px;
}

.notes {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.page-content {
  font-size: 16px;
  width: 100%;
  text-align: center;
  margin: 0 auto;
}

.note {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 3px;
  background-color: rgb(93, 93, 93);
}
</style>
