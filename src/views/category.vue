<template>
  <div class="wrapper">
    <!-- {{ route.query }} -->
    <el-row>
      <el-col :lg="4">
        <div class="category">
          <div class="category-title">
            <span>{{ route.query.sub }}</span>
          </div>
          <ul>
            <li v-for="i in 5" :key="i"><span>OPPO</span></li>
          </ul>
        </div>
      </el-col>

      <el-col :lg="20">
        <div class="content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, defineComponent } from "vue";
import useBasicValue from "../composables/basic/useBasicValue";
export default defineComponent({
  props: {},
  components: {},
  setup: () => {
    const { route, router, store } = useBasicValue();
    return { route, router, store };
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  margin: 0 10%;
  min-height: 800px;
  position: relative;
  .category {
    min-height: 800px;
    border: solid 1px $color-primary;
    text-align: left;
    .category-title {
      height: 36px;
      background: $color-primary;
      color: #fff;
      padding: 0 5%;
      margin-bottom: 10px;
      > span {
        line-height: 36px;
      }
    }
    > ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      > li {
        width: 50%;
        height: 36px;
        cursor: pointer;
        text-align: center;
        &:first-child {
          width: 50.1%;
          // text-align: left;
        }
        &:hover {
          background: $color-primary;
          color: #fff;
        }
        > span {
          // padding-left: 10px;
          line-height: 36px;
        }
      }
    }
  }
  .content {
  }
}
</style>
