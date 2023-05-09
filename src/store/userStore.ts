import { defineStore } from "pinia";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "../firebase";
import type { User } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(newUser: any) {
      this.user = newUser;
    },
    async signInWithGoogle() {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User signed in:", user);
        this.user = user;
      } catch (error) {
        console.error("Error signing in:", error);
      }
    },
    async signOut() {
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  },
});
