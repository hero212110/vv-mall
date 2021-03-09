<template>
  <div class="wrapper">
    <div class="container">
      <div class="logo">
        <img
          @click="router.push('/')"
          src="https://img3.momoshop.com.tw/ecm/img/online/10/998/00/000/bt_0_243_01/bt_0_243_01_e2.png?t=1614248290490"
          alt=""
        />
      </div>
      <div class="search-box">
        <el-input class="banner-search" placeholder="請輸入...">
          <template #append>
            <el-button type="primary" icon="el-icon-search"></el-button>
          </template>
        </el-input>
        <ul class="search-hint">
          <li v-for="item in hintList" :key="item.text">{{ item.text }}</li>
        </ul>
      </div>
      <div class="event">
        {{ store.state.category.currCategory }}
        {{route.name}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, defineComponent } from "vue";
import useBasicValue from "../../composables/basic/useBasicValue";
import hintJson from "../../assets/data/home/hint.json";
export default defineComponent({
  props: {},
  components: {},
  setup: () => {
    const { route, router, store } = useBasicValue();
    const hintList = ref(hintJson);
    return { route, router, store, hintList };
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  height: 150px;
  min-height: 150px;
  padding: 0 calc(10% + 20px);
  //   background: lightblue;
  background: linear-gradient(
    rgba($color-primary, 0.6),
    rgba($color-primary, 0.2)
  );
  .container {
    height: 150px;
    display: flex;
    .logo {
      width: 30%;
      > img {
        height: 150px;
        cursor: pointer;
      }
    }
    .search-box {
      width: 40%;
      .banner-search {
        width: 100%;
        margin-top: 50px;
      }
      .search-hint {
        list-style: none;
        > li {
          display: inline;
          padding-right: 15px;
          position: relative;
          font-size: 0.6em;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          &:hover {
            color: $color-red;
          }
          &:not(:last-child) {
            &:after {
              content: "|";
              position: absolute;
              top: 0;
              right: 10%;
              color: #666;
            }
          }
        }
      }
    }
    .event {
      width: 30%;
    }
  }
}
</style>
