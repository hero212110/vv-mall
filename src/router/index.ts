import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import store from "../store/index";
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  let tmp: any = localStorage.getItem("userData");
  // console.log(localStorage.getItem("userData"));
  store.commit("SET_USER_DATA", JSON.parse(tmp));
  next();
});
export default router;
