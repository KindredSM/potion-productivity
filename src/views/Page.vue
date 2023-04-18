<template>
  <div class="home">
    <div class="page">
      <h1 class="page-header">
        <textarea
          v-model="title"
          key="title"
          id="title"
          placeholder="Title..."></textarea>
      </h1>
      <p class="page-content">
        <textarea
          v-model="content"
          key="content"
          id="content"
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
import { ref, onUnmounted, watch } from "vue";
import { auth } from "../firebase";
import { getFirestore, doc, updateDoc, onSnapshot } from "firebase/firestore";

const db = getFirestore();

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
      if (!auth.currentUser) return;

      try {
        await updateDoc(
          doc(db, "users", auth.currentUser.uid, "pages", this.id),
          {
            title: this.title,
            content: this.content,
          }
        );
      } catch (e) {
        console.error("Error while saving data to Firestore:", e);
      }
    },
  },
  watch: {
    id() {
      if (!auth.currentUser) return;

      const docRef = doc(db, "users", auth.currentUser.uid, "pages", this.id);
      this.unsubscribe = onSnapshot(docRef, (doc: any) => {
        if (doc.exists()) {
          const page = doc.data();
          this.content = page.content;
          this.title = page.title;
        } else {
          this.content = "";
          this.title = "";
        }
      });
    },
    title() {
      this.saveData();
    },
    content() {
      this.saveData();
    },
  },

  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  async mounted() {
    console.log("Page mounted with id", this.id);
    if (!auth.currentUser) return;

    const docRef = doc(db, "users", auth.currentUser.uid, "pages", this.id);
    this.unsubscribe = onSnapshot(docRef, (doc: any) => {
      if (doc.exists()) {
        const page = doc.data();
        this.content = page.content;
        this.title = page.title;
      }
    });
  },
};
</script>
