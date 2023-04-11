<template>
  <div class="home">
    <div class="page">
      <h1 class="page-header">
        <textarea
          v-model="title"
          key="title"
          id="title"
          @input="saveData"
          placeholder="Title..."></textarea>
      </h1>
      <p class="page-content">
        <textarea
          v-model="content"
          key="content"
          id="content"
          @input="saveData"
          placeholder="Write your note..."
          oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'></textarea>
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
  .page {
    width: 100vw;
  }
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
  watch: {
    id() {
      const pages = JSON.parse(localStorage.getItem("pages") || "[]");
      const page = pages.find((p: any) => p.id === this.id);
      if (page) {
        this.content = page.content;
        this.title = page.title;
      } else {
        this.content = "";
        this.title = "";
      }
    },
  },
  mounted() {
    console.log("Page mounted with id", this.id);
    const pages = JSON.parse(localStorage.getItem("pages") || "[]");
    const page = pages.find((p: any) => p.id === this.id);
    if (page) {
      this.content = page.content;
      this.title = page.title;
    }
  },
};
</script>
