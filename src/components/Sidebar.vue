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
              <button class="delete" @click.stop="deletePage(index)">
                <delete-button></delete-button></button
            ></router-link>
          </div>
        </router-link>
      </li>
    </span>
    <div class="buttons">
      <router-link to="/">
        <button @click="clearAllAndToggleSidebar" class="clear-all">
          <delete-button class="clear-button"></delete-button>
          <p>Clear all</p>
        </button></router-link
      >
      <button @click="addPage" class="new-page">
        <add-button class="add-button"></add-button>
        <p>New Page</p>
      </button>
    </div>
  </ul>
</template>

<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import { ref } from "vue";
import close from "../svgs/close.vue";
import DeleteButton from "../svgs/deleteButton.vue";
import AddButton from "../svgs/addButton.vue";
import db from "../firebase";

export default {
  components: { close, DeleteButton, AddButton },
  data() {
    return {
      pages: [] as { id: string; title: string; content: string }[],
      isSidebarVisible: false,
      rotate: false,
    };
  },
  created() {
    this.fetchPages();
  },
  methods: {
    async fetchPages() {
      const pagesSnapshot = await db.collection("pages").get();
      this.pages = pagesSnapshot.docs.map((doc: any) => {
        return { id: doc.id, ...doc.data() } as {
          id: string;
          title: string;
          content: string;
        };
      });
    },
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
    async addPage() {
      const newPage = {
        id: uuidv4(),
        title: `Page ${this.pages.length + 1}`,
        content: "",
      };
      this.pages.push(newPage);

      await db.collection("pages").doc(newPage.id).set(newPage);
    },

    async deletePage(index: number) {
      const pageId = this.pages[index].id;
      this.pages.splice(index, 1);
      await db.collection("pages").doc(pageId).delete();
    },

    async clearAll() {
      for (const page of this.pages) {
        await db.collection("pages").doc(page.id).delete();
      }
      this.pages = [];
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
  background: none;
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
  max-height: calc(100% - 300px);
  overflow-y: auto;
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
  justify-content: space-between;
}

.menu-item:hover {
  cursor: pointer;
  background-color: #161616;
}

.delete {
  display: flex;
  border: none;
  background: none;
  color: white;
  padding: 0;
  transition: ease 0.2s;
}

.delete:hover {
  opacity: 0.8;
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
  width: 90%;
  margin: 0 auto;
  border-radius: 3px;
  background-color: #161616;
  color: white;
  text-decoration: none;
  position: relative;
  transition: ease 0.2s;
}

.clear-all:hover,
.new-page:hover {
  background-color: #232323;
}

.add-button,
.clear-button {
  position: absolute;
  left: 20px;
  bottom: 14px;
}

@media screen and (max-width: 900px) {
  .sidebar {
    width: 100vw;
  }

  .delete {
    bottom: 0.6rem;
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
