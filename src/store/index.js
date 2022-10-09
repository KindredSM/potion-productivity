import { createStore } from "vuex";

export default createStore({
  state: {
    notes: {
      "Home Note": "hello, this is a note",
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

      while ("Note " + i in state.notes) {
        i++;
      }

      state.notes["Note " + i] = "";
    },
  },
  actions: {},
  modules: {},
});
