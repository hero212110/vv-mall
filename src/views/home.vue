<template>
  <div class="wrapper">
    <el-row>
      <el-col :lg="4">
        <div class="category-wrapper">
          <div class="category-container">
            <ul>
              <li
                v-for="item in categoryList.first"
                :key="item.text"
                @mouseover="SetCategory(item)"
              >
                <p>{{ item.text }}</p>
              </li>
              <div v-show="currCategory" class="category-detail-wrapper">
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
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :lg="20">
        <div class="carousel-wrapper">
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
        <div class="flash-deal-container">
          <div class="left">
            <div class="inner">
              <h5>秒殺商品</h5>
              <h6>FLASH DEALS</h6>
              <div class="flash-icon">
                <flashSVG style="width: 70px; height: 70px" />
              </div>
              <div class="count-text">優惠結束倒數</div>
              <ul class="count-time">
                <li>00</li>
                <li>00</li>
                <li>00</li>
              </ul>
            </div>
          </div>
          <div class="right">
            <ul>
              <li v-for="item in recomList.flash" :key="item.name">
                <img :src="item.img" alt="" />
                <div class="goods-name">
                  {{ item.name }}
                </div>
                <div class="goods-price">
                  <div class="left">￥{{ item.new_price }}</div>
                  <div class="right">￥{{ item.old_price }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px">
      <el-col :lg="24">
        <p style="font-size: 1.4em; font-weight: 600">-熱銷排行榜-</p>
        <div class="rank-container">
          <div class="left">
            <img
              src="https://img13.360buyimg.com/babel/jfs/t1/124107/8/13431/184513/5f6b06cdEbb2b4893/f0fc789778fb397a.png.webp"
              alt=""
            />
          </div>
          <ul class="right">
            <li v-for="(item, index) in recomList.rank" :key="index">
              <div class="top">
                <img :src="item.img" alt="" />
              </div>
              <div class="bottom">
                <div class="num">{{ index + 1 }}</div>
                <div class="content">
                  <div class="rate">
                    <span>{{ item.rate }}</span>
                  </div>
                  <div class="txt">
                    <p>{{ item.txt }}</p>
                    <p>¥{{ item.price }}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { ref, toRefs, defineComponent, reactive } from "vue";
import useBasicValue from "../composables/basic/useBasicValue";
import categoryJson from "../assets/data/home/category.json";
import carouselJson from "../assets/data/home/carousel.json";
import hintJson from "../assets/data/home/hint.json";
import recomJson from "../assets/data/home/recom.json";
import flashSVG from "../assets/images/flash.svg";
export default defineComponent({
  components: { flashSVG },
  setup: () => {
    const { route, router, store } = useBasicValue();
    const data = reactive({
      currCategory: "",
      categoryList: categoryJson,
      carouselList: carouselJson,
      hintList: hintJson,
      recomList: recomJson,
    });

    const SetCategory = (val: any) => {
      data.currCategory = val;
    };

    return {
      ...toRefs(data),
      route,
      router,
      store,
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
    .category-container {
      width: 100%;
      height: 500px;
      color: #666;
      background: white;
      font-size: 0.8em;
      > ul {
        padding: 10px 0 10px 10px;
        list-style: none;
        text-align: left;
        &:hover .category-detail-wrapper {
          display: flex !important;
        }
        > li {
          padding: 8px 10%;
          margin-bottom: 2px;
          cursor: pointer;
          &:hover {
            background: $color-primary;
            color: #fff;
            // color: $color-primary;
            // background: #d9d9d9;
          }
        }
      }
    }
    .category-detail-wrapper {
      display: none;
      position: absolute;
      bottom: -3px;
      left: 16.5%;
      width: 50%;
      min-height: 500px;
      background: white;
      // border-left: 1.5px solid rgba($color: #000000, $alpha: 0.1);
      border: 3px solid rgba($color: $color-primary, $alpha:1);
      z-index: 99;
      .category-detail-container {
        width: 100%;
        list-style: none;
        > li {
          display: flex;
          flex-wrap: wrap;
          width: 90%;
          padding: 10px 5% 10px 4%;
          .left {
            width: 15%;
            margin-top: 5px;
            text-align: center;
            color: #666;
            > span {
              margin-right: 5px;
              font-weight: 800;
              font-size: 1.1em;
              cursor: pointer;
              &:hover {
                color: $color-primary;
              }
            }
          }
          .right {
            width: 85%;
            list-style: none;
            text-align: left;
            > li {
              display: inline-block;
              padding: 0 10px;
              margin-top: 5px;
              border-left: 1px solid rgba($color: #000000, $alpha: 0.2);
              > span {
                &:hover {
                  color: $color-primary;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
  .carousel-wrapper {
    margin-left: 1%;
    min-height: 500px;
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
  .flash-deal-container {
    display: flex;
    min-height: 300px;
    margin-top: 20px;
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.7);
    @keyframes breath {
      0% {
        fill: white;
      }
      50% {
        fill: $color-active;
      }
      100% {
        fill: white;
      }
    }
    .left {
      width: 15%;
      background: #f02b2b;
      color: #fff;
      text-align: center;
      .inner {
        margin: 20px 5%;
        > h5 {
          height: 40px;
          line-height: 40px;
          font-size: 32px;
          font-weight: 400;
        }
        > h6 {
          height: 28px;
          line-height: 28px;
          font-size: 19px;
          font-weight: 400;
          opacity: 0.6;
        }
        .flash-icon {
          height: 70px;
          margin: 10px 0 20px 0;
          > svg {
            animation: breath 5s infinite;
            fill: white;
          }
        }
        .count-text {
          margin: 10px 0;
        }
        .count-time {
          list-style: none;
          > li {
            display: inline-block;
            background: black;
            margin: 0 5px;
            padding: 10px 10px;
            border-radius: 2px;
          }
        }
      }
    }
    .right {
      width: 85%;
      background: #fff;
      > ul {
        list-style: none;
        display: flex;
        width: 100%;
        > li {
          width: 20%;
          margin-right: 1%;
          cursor: pointer;
          &:hover .goods-name {
            color: #c81623;
          }
          &:hover > img {
            opacity: 0.8;
          }
          &:first-child {
            margin-left: 1%;
          }
          > img {
            width: 100%;
            height: 220px;
          }
          .goods-name {
            padding: 0 5%;
            height: 36px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 14px;
          }
          .goods-price {
            margin: 5px 5% 0 5%;
            border: 1px solid #f02b2b;
            min-height: 30px;
            display: flex;
            font-weight: 600;
            .left {
              width: 50%;
              line-height: 30px;
              background: #f02b2b;
              color: #fff;
            }
            .right {
              width: 50%;
              line-height: 30px;
              background: #fff;
              color: #ccc;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
  .rank-container {
    display: flex;
    min-height: 300px;
    margin-top: 20px;
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.7);
    .left {
      width: 15%;
      background: transparent;
      > img {
        padding-right: 5%;
        width: 95%;
        height: 100%;
      }
    }
    .right {
      width: 85%;
      list-style: none;
      display: flex;
      > li {
        width: 20%;
        cursor: pointer;
        transition: 0.2s ease-out;
        &:hover {
          transform: translateY(-10px);
          opacity: 0.8;
        }
        &:not(&:last-child) {
          margin-right: 1%;
        }
        display: inline-block;
        .top {
          height: 60%;
          background: lightblue;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .bottom {
          height: 40%;
          text-align: left;
          display: flex;
          .num {
            width: 20%;
            font-size: 60px;
            font-weight: 600;
            color: #f42d54;
          }
          .content {
            width: 80%;
            font-size: 12px;
            .rate {
              margin-top: 10px;
              height: 30px;
              > span {
                border-radius: 16px;
                border: 1px solid #f42d54;
                padding: 5px 10px;
              }
            }
            .txt {
              > p {
                &:last-child {
                  padding-top: 5px;
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
