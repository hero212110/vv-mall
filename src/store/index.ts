import { createStore } from "vuex";

export default createStore({
  state: {
    count: 0,
    userData: [],
  },
  mutations: {
    SET_USER_DATA(state, val) {
      state.userData = JSON.parse(JSON.stringify(val));
      localStorage.setItem("userData", JSON.stringify(state.userData));
    },
  },
  actions: {
    // increment(context) {
    //   context.commit("increment");
    // },
  },
});
