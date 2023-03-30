<template>
  <div class="home">
    <div class="page">
      <h1 class="page-header">
        <textarea v-model="title" key="title" @input="saveData"></textarea>
      </h1>
      <p class="page-content">
        <textarea v-model="content" key="content" @input="saveData"></textarea>
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
  padding-top: 124px;
  margin-right: 32px;
  margin-left: 128px;
}

textarea {
  width: 100%;
  padding: 5px;
  font-family: "Poppins";
  outline: none;
  border: none;
  resize: none;
  font-size: 16px;
  background-color: #242424;
}

.page {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 70vw;
  margin: 0 auto;
  height: 100vh;
}
</style>

<script lang="ts">
export default {
  props: ["id"],

  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    saveData() {
      const pages = JSON.parse(localStorage.getItem("pages") || "[]");
      const index = pages.findIndex((p: any) => p.id === this.id);
      if (index !== -1) {
        pages[index].content = this.content;
        pages[index].title = this.title;
      } else {
        pages.push({
          id: this.id,
          content: this.content,
          title: this.title,
        });
      }
      try {
        localStorage.setItem("pages", JSON.stringify(pages));
      } catch (e) {
        console.error("Error while saving data to Local Storage:", e);
      }
    },
  },
  mounted() {
    const pages = JSON.parse(localStorage.getItem("pages") || "[]");
    const page = pages.find((p: any) => p.id === this.id);
    if (page) {
      this.content = page.content;
      this.title = page.title;
    }
  },
};
</script>
