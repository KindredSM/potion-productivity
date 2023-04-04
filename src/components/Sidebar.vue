<template>
  <button class="close" @click="toggleMenu">x</button>
  <ul class="sidebar" v-if="showMenu">
    <span class="menu" v-auto-animate>
      <li class="menu-item" v-for="(page, index) in pages" :key="page.id">
        <router-link :to="`/page/${page.id}`" class="menu-item">
          <p class="page-title">{{ page.title }}</p>
          <div class="button-wrapper">
            <router-link to="/">
              <button class="delete" @click="deletePage(index)">
                X
              </button></router-link
            >
          </div>
        </router-link>
      </li>
    </span>
    <div class="buttons">
      <router-link to="/">
        <button @click="clearAll" class="clear-all">
          <p>Clear all</p>
        </button></router-link
      >
      <button @click="addPage" class="new-page"><p>New Page</p></button>
    </div>
  </ul>
</template>

<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";

export default {
  data() {
    return {
      pages: [] as { id: string; title: string; content: string }[],
      showMenu: true,
    };
  },
  created() {
    const storedPages = JSON.parse(localStorage.getItem("pages") || "[]");
    this.pages = storedPages || [];
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    addPage() {
      const newPage = {
        id: uuidv4(),
        title: `Page ${this.pages.length + 1}`,
        content: "",
      };
      this.pages.push(newPage);

      localStorage.setItem("pages", JSON.stringify(this.pages));
    },

    deletePage(index: number) {
      this.pages.splice(index, 1);

      localStorage.setItem("pages", JSON.stringify(this.pages));
    },
    clearAll() {
      this.pages = [];

      localStorage.setItem("pages", JSON.stringify(this.pages));
    },
  },
};
</script>

<style>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 210px;
  z-index: 3;
  background-color: rgb(25, 25, 25);
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  padding-left: 0;
}
.close {
  width: 50px;
  height: 50px;
  left: 10rem;
  position: absolute;
  background-color: blue;
  z-index: 99;
}

.close:hover {
  cursor: pointer;
}
.menu {
  padding-top: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  text-align: left;
  width: 100%;
}

.sidebar-header {
  font-weight: 700;
  background: linear-gradient(215.78deg, #ff5d2b 2.99%, #ffb800 104.97%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  font-size: 16px;
}

.menu-item {
  display: flex;
  flex-direction: row;

  align-content: center;
  align-items: center;
  background-color: #1a1a1a;
  width: 95%;
  position: inherit;
  border-radius: 3px;
  transition: ease 0.3s;
  margin: 0 auto;
}

.menu-item:hover {
  cursor: pointer;
  background-color: #161616;
}

.delete {
  border-radius: 50%;
}

.button-wrapper {
  position: absolute;
  right: 0.5rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.clear-all,
.new-page {
  border-radius: 3px;
  background-color: #161616;
  width: 190px;
}
</style>
