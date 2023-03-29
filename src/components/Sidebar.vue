<template>
  <ul class="sidebar">
    <span class="menu">
      <li class="menu-item" v-for="(page, index) in pages" :key="index">
        <router-link :to="`/page/${index}`">
          <p>
            {{ page
            }}<button class="delete" @click="deletePage(index)">X</button>
          </p>
        </router-link>
      </li>
    </span>
    <button @click="addPage">
      <p>New Page +</p>
    </button>
  </ul>
</template>

<script lang="ts">
export default {
  data() {
    return {
      pages: ["Page 1"],
    };
  },
  methods: {
    addPage() {
      const newPage = `Page ${this.pages.length + 1}`;
      this.pages.push(newPage);
    },
    deletePage(index) {
      this.pages.splice(index, 1);
    },
  },
  mounted() {
    const savedPages = localStorage.getItem("pages");
    if (savedPages) {
      this.pages = JSON.parse(savedPages);
    }
  },
  watch: {
    pages(newPages) {
      localStorage.setItem("pages", JSON.stringify(newPages));
    },
  },
};
</script>

<style>
.menu {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  text-align: left;
  width: 80%;
  margin: 0 auto;
}

.delete {
  margin-left: 10px;
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
