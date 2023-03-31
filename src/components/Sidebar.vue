<template>
  <ul class="sidebar">
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
      <button @click="addPage" class="new-page"><p>New Page +</p></button>
    </div>
  </ul>
</template>

<script lang="ts">
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      pages: [] as { id: string; title: string; content: string }[],
    };
  },
  created() {
    const storedPages = JSON.parse(localStorage.getItem("pages") || "[]");
    this.pages = storedPages || [];
  },
  methods: {
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
    clearAll(index: number) {
      this.pages.splice(index);

      localStorage.setItem("pages", JSON.stringify(this.pages));
    },
  },
};
</script>

<style>
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

.menu-item {
  display: flex;
  flex-direction: row;

  align-content: center;
  align-items: center;
  padding-left: 10px;
  background-color: #1a1a1a;
  width: 90%;
  margin: 0 auto;
  position: inherit;
  border-radius: 3px;
  transition: ease 0.3s;
}

.menu-item:hover {
  cursor: pointer;
  background-color: #202020;
}

.delete {
  border-radius: 50%;
}

.button-wrapper {
  position: absolute;
  right: 1rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.clear-all {
  background: none;
}

.clear-all,
.new-page {
  border-radius: 3px;
  width: 190px;
}

.new-page:hover {
  background: none;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 200px;
  z-index: 3;
  padding-top: 104px;
  background-color: rgb(39, 39, 39);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
