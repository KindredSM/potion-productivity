<template>
  <div class="home">
    <div class="header">
      <h1 class="header">Welcome to Potion.</h1>
    </div>
    <p class="page-content">here, you can write notes</p>
    <div class="notes"></div>
  </div>
</template>

<script lang="ts"></script>

<style>
.home {
  padding-bottom: 120px;
  padding-top: 124px;
  margin-right: 32px;
  margin-left: 128px;
}

.header {
  background: linear-gradient(215.78deg, #ff5d2b 2.99%, #ffb800 104.97%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-align: left;
}

.notes {
  display: flex;
  flex-direction: row;
  gap: 10px;
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
