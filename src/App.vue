<template>
  <el-container>
    <el-header>
      <layout-header></layout-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LayoutHeader from "@/components/layouts/LayoutHeader.vue";
export default defineComponent({
  name: "App",
  components: { LayoutHeader },
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
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  // line-height: 200px;
}
.el-main {
  background-color: white;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}
</style>
