<template>
  <button ref="closeButton" class="close" @click="toggleSidebar">
    <close></close>
  </button>
  <ul class="sidebar" :class="{ 'slide-out': !isSidebarVisible }">
    <router-link to="/"> <h1 class="sidebar-header">Potion</h1></router-link>
    <span class="menu" v-auto-animate>
      <li class="menu-item" v-for="(page, index) in pages" :key="page.id">
        <router-link
          :to="`/page/${page.id}`"
          class="menu-item"
          @click="toggleSidebar">
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
        <button @click="clearAllAndToggleSidebar" class="clear-all">
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
import close from "../svgs/close.vue";

export default {
  components: { close },
  data() {
    return {
      pages: [] as { id: string; title: string; content: string }[],
      isSidebarVisible: false,
      rotate: false,
    };
  },
  created() {
    const storedPages = JSON.parse(localStorage.getItem("pages") || "[]");
    this.pages = storedPages || [];
  },
  methods: {
    clearAllAndToggleSidebar() {
      this.clearAll();
      this.toggleSidebar();
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      this.rotate = !this.rotate;
      if (this.rotate) {
        (this.$refs.closeButton as HTMLElement).classList.add("rotate");
      } else {
        (this.$refs.closeButton as HTMLElement).classList.remove("rotate");
      }
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
  top: -24px;
  left: 0;
  height: 100%;
  width: 210px;
  z-index: 3;
  background-color: rgb(25, 25, 25);
  display: flex;
  flex-direction: column;
  padding-left: 0;
  transition: transform 0.2s ease-in-out;
}

.slide-out {
  transform: translateX(-100%);
}

.close {
  z-index: 99;
  position: fixed;
  padding: 0;
  margin: 0;
  top: 4px;
  left: 0;
  background-color: #1a1a1a;
  color: #fff;
  padding: 5px;
  border: 0;
  transition: transform 0.2s;
}

.rotate {
  transform: rotate(180deg);
  transition: transform 0.2s;
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
  margin-top: 24px;
  font-weight: 700;
  background: linear-gradient(215.78deg, #ff5d2b 2.99%, #ffb800 104.97%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 16px;
}

.sidebar-header:hover {
  cursor: pointer;
}

.menu-item {
  display: flex;
  flex-direction: row;

  align-content: center;
  align-items: center;
  background-color: #1a1a1a;
  width: 95%;
  gap: 10px;
  border-radius: 3px;
  transition: ease 0.3s;
  margin: 0 auto;
  position: relative;
}

.menu-item:hover {
  cursor: pointer;
  background-color: #161616;
}

.delete {
  border-radius: 50%;
  position: absolute;
  right: 0rem;
  bottom: 0.5rem;
}

.buttons {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.clear-all,
.new-page {
  width: 100%;
  border-radius: 3px;
  background-color: #161616;
}

@media screen and (max-width: 900px) {
  .sidebar-header {
    display: none;
  }

  .sidebar {
    width: 50vw;
  }

  .delete {
    bottom: 1rem;
  }

  .new-page,
  .clear-all {
    width: 100%;
  }

  .buttons {
    width: 80%;
    position: relative;
    margin-bottom: 50px;

    justify-content: flex-end;
  }

  .menu {
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
}
</style>
