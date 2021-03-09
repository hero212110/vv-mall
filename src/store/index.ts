import { createStore } from "vuex";
import auth from "./modules/auth";
import category from "./modules/category";
export default createStore({
  modules: { auth, category },
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
