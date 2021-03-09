export default [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home.vue"), //路由懒加载
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("@/views/category.vue"), //路由懒加载
  },
  {
    path: "/info",
    name: "Info",
    component: () => import("@/views/info.vue"), //路由懒加载
  },
];
