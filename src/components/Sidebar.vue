<template>
  <ul class="sidebar">
    <span class="menu">
      <li class="menu-item" v-for="(page, index) in pages" :key="index">
        <router-link :to="`/page/${index}`" class="menu-item">
          <p class="page-title">
            {{ page.title }}
          </p>
          <button class="delete" @click="deletePage(index)">X</button>
        </router-link>
      </li>
    </span>
    <button @click="addPage">
      <p>New Page +</p>
    </button>
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
  },
  watch: {
    pages: {
      handler(newPages, oldPages) {
        for (let i = 0; i < newPages.length; i++) {
          if (JSON.stringify(newPages[i]) !== JSON.stringify(oldPages[i])) {
            localStorage.setItem(`page-${i}`, JSON.stringify(newPages[i]));
          }
        }
      },
      deep: true,
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
