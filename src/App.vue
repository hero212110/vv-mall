<template>
  <el-container>
    <el-header>
      <layout-header></layout-header>
    </el-header>
    <nav class="el-nav">
      <layout-banner></layout-banner>
      <layout-nav></layout-nav>
    </nav>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LayoutHeader from "@/components/layouts/LayoutHeader.vue";
import LayoutBanner from "@/components/layouts/LayoutBanner.vue";
import LayoutNav from "@/components/layouts/LayoutNav.vue";
export default defineComponent({
  name: "App",
  components: { LayoutHeader, LayoutBanner, LayoutNav },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: Microsoft JhengHei;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header {
  background-color: #333332;
  color: white;
  text-align: center;
  line-height: 40px;
  height: 40px !important;
  position: fixed;
  width: 100%;
  z-index: 999;
}
.el-nav {
  margin-top: 40px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  // line-height: 200px;
}
.el-main {
  // background-color: white;
  background: rgb(241, 240, 240);
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}
</style>
