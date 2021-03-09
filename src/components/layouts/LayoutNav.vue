<template>
  <div v-if="route.name!='Home'" class="wrapper">
    <ul>
      <li
        v-for="item in navList.first"
        :key="item.order"
        :class="{
          active: item.id == route.query.id,
        }"
        @mouseover="HoverCategory(item)"
      >
        <div>
          <span>{{ item.text }}</span>
        </div>
      </li>
      <div class="detail-wrapper">
        <ul class="detail-container">
          <li v-for="x in navList.second[currCategory.id]" :key="x">
            <div class="top">
              <span>{{ x.title }}</span>
            </div>
            <div class="bottom">
              <ul>
                <li
                  v-for="y in x.content"
                  :key="y"
                  @click="SetCategory(y)"
                  :class="{
                    active: y == route.query.sub,
                  }"
                >
                  <span>{{ y }}</span>
                </li>
              </ul>
            </div>
          </li>
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
      currCategory: { id: "" },
      navList: navJson,
    });

    const HoverCategory = (val: any) => {
      data.currCategory = val;
    };

     const SetCategory = (val: any) => {
      store.commit("category/SET_CATEGORY", {
        id: data.currCategory.id,
        sub: val,
      });
      router.push({
        name: "Category",
        query: { id: data.currCategory.id, sub: val },
      });
    };

    return {
      ...toRefs(data),
      route,
      router,
      store,
      HoverCategory,
      SetCategory,
    };
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
      &.active {
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
        display: flex;
        width: 100%;
        > li {
          display: inline-block;
          border-right: 1px solid #dfdfdf;
          width: calc(100% / 9);
          min-height: 100%;
          .top {
            height: 30px;
            background: #ececec;
            > span {
              line-height: 30px;
              font-weight: 600;
              font-size: 0.9em;
            }
          }
          .bottom {
            > ul {
              list-style: none;
              > li {
                margin: 5px 0;
                cursor: pointer;
                font-size: 0.9em;
                height: 25px;
                overflow: hidden;
                &.active {
                  background: $color-primary;
                  color: #fff;
                  &:hover {
                    color: #fff;
                  }
                }
                &:hover {
                  color: $color-primary;
                }
                > span {
                  line-height: 25px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
