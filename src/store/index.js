import { createStore } from "vuex";

export default createStore({
  state: {
    notes: {
      "kindreds note": "hi this is kindred's note",
    },
  },
  getters: {
    labels: function (state) {
      return Object.keys(state.notes);
    },
  },
  mutations: {
    newNote: function (state) {
      let i = 1;

      while ("Untitled " + i in state.notes) {
        i++;
      }

      state.notes["Untitled " + i] = "";
    },
  },
  actions: {},
  modules: {},
});
