<template>
  <div class="wrapper">
    <el-row type="flex" justify="end">
      <el-col :lg="8" :md="8" :sm="24">
        <ul class="feature">
          <li @click="router.push('/')"><i class="fa fa-home"></i>首頁</li>
          <li>
            <el-input
              size="small"
              placeholder="搜尋商品"
              suffix-icon="el-icon-search"
              v-model="pattern"
            >
            </el-input>
          </li>
        </ul>
      </el-col>
      <el-col :lg="16" :md="16" class="hidden-sm-and-down">
        <ul class="member">
          <template v-for="item in featureList" :key="item.text">
            <li
              v-if="store.state.auth.isLogined ? item.Auth : item.noAuth"
              @click="memberOperation(item)"
            >
              <i v-if="item.icon" :class="item.icon"></i>
              {{ item.text }}
            </li>
          </template>
        </ul>
      </el-col>
    </el-row>
    <login-dialog
      :dialog="loginDialog"
      @doOpen="doOpen('register')"
      @doClose="doClose('login')"
    ></login-dialog>
    <register-dialog
      :dialog="registerDialog"
      @doOpen="doOpen('login')"
      @doClose="doClose('register')"
    ></register-dialog>
  </div>
</template>

<script lang="ts">
import { ref, unref, toRefs, reactive, defineComponent, watch } from "vue";
import useBasicValue from "../../composables/basic/useBasicValue";
import LoginDialog from "../dialog/LoginDialog.vue";
import RegisterDialog from "../dialog/RegisterDialog.vue";
export default defineComponent({
  props: {},
  components: { LoginDialog, RegisterDialog },
  setup: () => {
    const { route, router, store } = useBasicValue();
    const pattern = ref(null);
    const data = reactive({
      loginDialog: false,
      registerDialog: false,
    });
    const featureList = ref([
      { text: "登入", icon: null, noAuth: true, Auth: false },
      { text: "註冊", icon: null, noAuth: true, Auth: false },
      { text: "會員中心", icon: "fa fa-user", noAuth: true, Auth: true },
      { text: "訂單", icon: "fa fa-clipboard", noAuth: true, Auth: true },
      { text: "購物車", icon: "fa fa-shopping-cart", noAuth: true, Auth: true },
      { text: "登出", icon: "fa fa-sign-out", noAuth: false, Auth: true },
    ]);
    const doOpen = (val: any) => {
      setTimeout(() => {
        if (val == "login") {
          data.loginDialog = true;
        } else {
          data.registerDialog = true;
        }
      }, 250);
    };
    const doClose = (val: any) => {
      if (val == "login") {
        data.loginDialog = false;
      } else {
        data.registerDialog = false;
      }
    };

    const memberOperation = (item: any) => {
      const { text } = item;
      if (store.state.auth.isLogined) {
        if (text == "登出") {
          store.commit("auth/REMOVE_AUTH");
        }
      } else {
        if (text != "註冊") {
          data.loginDialog = true;
        } else {
          data.registerDialog = true;
        }
      }
    };

    return {
      ...toRefs(data),
      route,
      router,
      store,
      pattern,
      featureList,
      memberOperation,
      doOpen,
      doClose,
    };
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  height: 40px;
  padding: 0 10%;
  font-size: 0.8em;
  .feature {
    display: flex;
    list-style: none;
    > li {
      display: inline;
      padding-right: 5%;
      position: relative;
      cursor: pointer;
      &:hover {
        color: $color-primary;
      }
      //   &:not(:last-child) {
      //     &:after {
      //       content: "|";
      //       position: absolute;
      //       right: 20%;
      //     }
      //   }
    }
  }
  .member {
    display: flex;
    list-style: none;
    justify-content: flex-end;
    > li {
      display: inline;
      padding-right: 5%;
      position: relative;
      cursor: pointer;
      &:hover {
        color: $color-primary;
      }
      &:not(:last-child) {
        &:after {
          content: "|";
          color: white;
          position: absolute;
          right: 25%;
        }
      }
    }
  }
}
</style>
