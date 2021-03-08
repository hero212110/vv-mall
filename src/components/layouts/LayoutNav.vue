<template>
  <div class="wrapper">
    <ul>
      <li v-for="x in navList.first" :key="x.id">
        <div>
          <span>{{ x.text }}</span>
        </div>
      </li>
      <div class="detail-wrapper">
        <ul class="detail-container">
          <li></li>
        </ul>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, defineComponent } from "vue";
import useBasicValue from "../../composables/basic/useBasicValue";
import navJson from "../../assets/data/layout/nav.json";
export default defineComponent({
  props: {},
  components: {},
  setup: () => {
    const { route, router, store } = useBasicValue();
    const data = reactive({
      navList: navJson,
    });
    return { ...toRefs(data), route, router, store };
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  min-height: 40px;
  background: #515151;
  > ul {
    margin: 0 calc(10% + 20px);
    display: flex;
    list-style: none;
    position: relative;
    &:hover .detail-wrapper {
      display: flex !important;
    }
    > li {
      width: calc(100% / 11);
      height: 40px;
      display: inline-block;
      color: white;
      &:nth-child(11) {
        > div {
          border-right: 1px solid rgba($color: #fff, $alpha: 0.3);
        }
      }
      &:hover {
        background: $color-primary;
      }
      > div {
        border-left: 1px solid rgba($color: #fff, $alpha: 0.3);
        margin: 5px 0;
        height: 30px;
        cursor: pointer;
        > span {
          line-height: 30px;
        }
      }
    }
    .detail-wrapper {
      display: none;
      position: absolute;
      left: 0;
      top: 40px;
      width: 100%;
      min-height: 500px;
      background: white;
      border: 3px solid rgba($color: $color-primary, $alpha: 1);
      z-index: 99;
      .detail-container {
        list-style: none;
        > li {
            
        }
      }
    }
  }
}
</style>
