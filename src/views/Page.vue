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
import db from "../firebase";

export default {
  props: ["id"],

  data() {
    return {
      title: "",
      content: "",
      unsubscribe: () => {},
    };
  },
  methods: {
    async saveData() {
      try {
        await db.collection("pages").doc(this.id).update({
          title: this.title,
          content: this.content,
        });
      } catch (e) {
        console.error("Error while saving data to Firestore:", e);
      }
    },
  },
  watch: {
    async id() {
      const docRef = db.collection("pages").doc(this.id);
      this.unsubscribe = await docRef.onSnapshot((doc: any) => {
        if (doc.exists) {
          const page = doc.data();
          this.content = page.content;
          this.title = page.title;
        } else {
          this.content = "";
          this.title = "";
        }
      });
    },
  },
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  async mounted() {
    console.log("Page mounted with id", this.id);
    const docRef = db.collection("pages").doc(this.id);
    this.unsubscribe = await docRef.onSnapshot((doc: any) => {
      if (doc.exists) {
        const page = doc.data();
        this.content = page.content;
        this.title = page.title;
      }
    });
  },
};
</script>
