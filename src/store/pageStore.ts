import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  getDoc,
  query,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";
import { auth } from "../firebase";
import db from "../firebase";
import { onMounted } from "@vue/runtime-core";

export const usePagesStore = defineStore("pages", {
  state: () => ({
    pages: [] as { id: string; title: string; content: string }[],
    loading: false,
    title: "",
    content: "",
    isSidebarVisible: true,
    rotate: false,
  }),
  actions: {
    async fetchUserData() {
      if (!auth.currentUser) return;

      this.loading = true;
      try {
        const pagesRef = collection(db, "users", auth.currentUser.uid, "pages");
        const pagesSnapshot = await getDocs(pagesRef);
        this.pages = pagesSnapshot.docs.map((doc) => {
          const { id, title, content } = doc.data();
          return { id, title, content };
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        this.loading = false;
      }
    },

    getPageById(
      id: string
    ): { id: string; title: string; content: string } | undefined {
      return this.pages.find((page) => page.id === id);
    },

    async addPage() {
      if (!auth.currentUser) {
        alert("Sign in to create notes");
        return;
      }
      const newPage = {
        id: uuidv4(),
        title: `Page ${this.pages.length + 1}`,
        content: "",
      };
      this.pages.push(newPage);

      await setDoc(
        doc(db, "users", auth.currentUser.uid, "pages", newPage.id),
        newPage
      );
      return newPage.id;
    },

    async deletePage(index: number) {
      if (!auth.currentUser) return;

      const pageId = this.pages[index].id;
      this.pages.splice(index, 1);
      await deleteDoc(doc(db, "users", auth.currentUser.uid, "pages", pageId));
    },

    async clearAll() {
      if (!auth.currentUser) return;

      const batch = writeBatch(db);
      for (const page of this.pages) {
        batch.delete(doc(db, "users", auth.currentUser.uid, "pages", page.id));
      }
      await batch.commit();
      this.pages = [];
    },

    async saveData(id: string, title: string, content: string) {
      if (!auth.currentUser) return;

      this.loading = true;

      const docRef = doc(db, "users", auth.currentUser.uid, "pages", id);
      try {
        await setDoc(docRef, {
          title,
          content,
        });
      } catch (e) {
        console.error("Error while saving data to Firestore:", e);
      } finally {
        this.loading = false;
      }
    },
  },
});

onMounted(() => {
  usePagesStore().fetchUserData();
});
