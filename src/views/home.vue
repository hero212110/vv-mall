<template>
  <div class="wrapper">
    <el-row>
      <el-col :lg="4">
        <div class="category-wrapper">
          <div class="logo-container">
            <img src="../assets/images/logo.svg" alt="" />
          </div>
          <div class="category-container">
            <ul>
              <li
                v-for="item in categoryList.first"
                :key="item.text"
                @mouseenter="SetCategory(item)"
              >
                <p>{{ item.text }}</p>
              </li>
            </ul>
            <div class="category-detail-wrapper">
              <!-- {{ currCategory.id }} -->
              <ul class="category-detail-container">
                <li
                  v-for="x in categoryList.second[currCategory.id]"
                  :key="x.title"
                >
                  <div class="left">
                    <span>{{ x.title }}</span>
                    <i class="fa fa-angle-right"></i>
                  </div>
                  <ul class="right">
                    <li v-for="y in x.content" :key="y">
                      <span> {{ y }}</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="20">
        <div class="banner-wrapper">
          <div class="banner-container">
            <el-input class="banner-search" placeholder="請輸入...">
              <template #append>
                <el-button
                  style="background: #ffcf27"
                  icon="el-icon-search"
                ></el-button>
              </template>
            </el-input>
            <ul class="search-hint">
              <li v-for="item in hintList" :key="item.text">{{ item.text }}</li>
            </ul>
          </div>
          <div class="carousel-container">
            <el-carousel height="500px">
              <el-carousel-item v-for="item in carouselList" :key="item.img">
                <div class="carousel-block">
                  <img :src="item.img" alt="" />
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :lg="24">
        <div class="super-title">
          <span>超級強檔</span>
        </div>
      </el-col>

      <el-col :lg="14">
        <ul class="super-left">
          <li v-for="item in superList.left" :key="item.img">
            <img :src="item.img" alt="" />
          </li>
        </ul>
      </el-col>
      <el-col :lg="10">
        <ul class="super-right">
          <li v-for="item in superList.right" :key="item.img">
            <img :src="item.img" alt="" />
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { ref, toRefs, defineComponent, reactive } from "vue";
import useBasicValue from "../composables/basic/useBasicValue";
import hintJson from "../assets/data/home/hint.json";
import categoryJson from "../assets/data/home/category.json";
import carouselJson from "../assets/data/home/carousel.json";
import superJson from "../assets/data/home/super.json";
export default defineComponent({
  components: {},
  setup: () => {
    const { route, router, store } = useBasicValue();
    const hintList = ref(hintJson);
    const categoryList = ref(categoryJson);
    const carouselList = ref(carouselJson);
    const superList = ref(superJson);
    const data = reactive({
      currCategory: "",
    });

    const SetCategory = (val: any) => {
      data.currCategory = val;
    };

    return {
      ...toRefs(data),
      route,
      router,
      store,
      hintList,
      categoryList,
      carouselList,
      superList,
      SetCategory,
    };
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  margin: 0 10%;
  position: relative;
  .category-wrapper {
    min-height: 500px;
    .logo-container {
      background: whitesmoke;
      height: 140px;
      margin-bottom: 5px;
      > img {
        height: 100px;
      }
    }
    .category-container {
      width: 100%;
      height: 500px;
      color: #666;
      background: whitesmoke;
      font-size: 0.8em;
      &:hover .category-detail-wrapper {
        display: flex !important;
      }
      > ul {
        padding: 10px 10px;
        list-style: none;
        text-align: left;
        > li {
          padding: 8px 10%;
          margin-bottom: 2px;
          cursor: pointer;
          &:hover {
            color: $color-red;
            background: #d9d9d9;
          }
        }
      }
    }
    .category-detail-wrapper {
      display: none;
      position: absolute;
      bottom: 0;
      left: 16.5%;
      width: 50%;
      min-height: 500px;
      background: white;
      border-left: 1.5px solid rgba($color: #000000, $alpha: 0.1);
      box-shadow: 2px 0 5px rgb(0 0 0 / 30%);
      z-index: 99;
      .category-detail-container {
        width: 100%;
        list-style: none;
        > li {
          display: flex;
          flex-wrap: wrap;
          width: 90%;
          padding: 10px 5%;
          .left {
            width: 10%;
            margin-top: 5px;
            text-align: left;
            color: #666;
            > span {
              margin-right: 5px;
              font-weight: 700;
              font-size: 1em;
              cursor: pointer;
              &:hover {
                color: $color-red;
              }
            }
          }
          .right {
            width: 90%;
            list-style: none;
            text-align: left;
            > li {
              display: inline-block;
              padding: 0 10px;
              margin-top: 5px;
              border-left: 1px solid rgba($color: #000000, $alpha: 0.2);
              > span {
                &:hover {
                  color: $color-red;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
  .banner-wrapper {
    margin-left: 1%;
    min-height: 500px;
    .banner-container {
      min-height: 140px;
      margin-bottom: 5px;
      background: whitesmoke;
      .banner-search {
        width: 50%;
        margin-top: 30px;
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
    .carousel-container {
      min-height: 500px;
      .carousel-block {
        position: relative;
        height: 500px;
        > img {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .super-title {
    margin: 10px 0 5px 0;
    min-height: 35px;
    text-align: center;
    > span {
      line-height: 35px;
      font-weight: 700;
      font-size: 1.2em;
    }
  }
  .super-left {
    min-height: 200px;
    list-style: none;
    display: flex;
    > li {
      width: 20%;
      height: 200px;
      overflow: hidden;
      cursor: pointer;
      > img {
        width: 99%;
        height: 200px;
      }
    }
  }
  .super-right {
    min-height: 200px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    > li {
      width: 50%;
      height: 100px;
      cursor: pointer;
      &:nth-child(3) {
        padding-top: 7px;
      }
      &:nth-child(4) {
        padding-top: 7px;
      }
      > img {
        width: 100%;
      }
    }
  }
}
</style>
<style lang="scss">
.carousel-container {
  .el-carousel__indicators {
    .el-carousel__indicator--horizontal {
      display: inline-block;
      padding: 12px 4px 0px 4px;
    }
    .el-carousel__indicator.is-active {
      .el-carousel__button {
        background: $color-active !important;
      }
    }
  }
}
</style>
