<template>
  <div class="home">
    <div class="page">
      <h1 class="page-header">
        <textarea
          v-model="title"
          key="title"
          id="title"
          placeholder="Title..."
          @input="saveData(page.id, title, content)"></textarea>
      </h1>
      <p class="page-content">
        <textarea
          v-model="content"
          key="content"
          id="content"
          placeholder="Write your note..."
          oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          @input="saveData(page.id, title, content)"></textarea>
        <span v-if="pagesStore.loading">Loading...</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
[contenteditable="true"]:focus {
  outline: none;
}
.home {
  padding-bottom: 120px;
  padding-top: 100px;
}

textarea {
  width: 100%;
  padding: 5px;
  font-family: "Poppins";
  outline: none;
  border: none;
  resize: none;
  font-size: 16px;
  background-color: #161616;
}

#title {
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 0;
}

#content {
  font-size: 16px;
  font-weight: 300;
}

.page {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 65vw;
  margin: 0 auto;
  height: 100vh;
}

@media screen and (max-width: 900px) {
  .home {
    padding-top: 50px;
  }
  .page {
    width: 100vw;
  }
  #title {
    font-size: 30px;
  }

  #content {
    font-size: 20px;
  }
}
</style>

<script lang="ts">
import { computed, watchEffect } from "vue";
import { usePagesStore } from "../store/pageStore";
import { useRoute } from "vue-router";

export default {
  props: ["page", "id"],

  data() {
    return {
      title: "",
      content: "",
    };
  },
  setup() {
    const pagesStore = usePagesStore();
    const route = useRoute();

    const page = computed(() => {
      return pagesStore.getPageById(route.params.id as string);
    });

    const saveData = (id: string, title: string, content: string) => {
      pagesStore.saveData(id, title, content);
    };

    return {
      page,
      saveData,
      pagesStore,
    };
  },
};
</script>
