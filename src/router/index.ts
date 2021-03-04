import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import store from "../store/index";
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  let auth: any = localStorage.getItem("auth");
  if (auth) {
    store.commit("auth/RESTORE_AUTH", JSON.parse(auth));
  }
  next();
});
export default router;
