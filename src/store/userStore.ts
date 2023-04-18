import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(newUser: any) {
      this.user = newUser;
    },
  },
});
