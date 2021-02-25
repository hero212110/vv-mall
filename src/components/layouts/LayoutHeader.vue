<template>
  <div class="wrapper">
    <el-row type="flex" justify="end">
      <el-col :lg="8" :md="8" :sm="24">
        <ul class="feature">
          <li><i class="fa fa-home"></i>首頁</li>
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
          <li @click="dialog = true">登入</li>
          <li>註冊</li>
          <li><i class="fa fa-user"></i>會員中心</li>
          <li><i class="fa fa-clipboard"></i>訂單</li>
          <li><i class="fa fa-shopping-cart"></i>購物車</li>
        </ul>
      </el-col>
    </el-row>
    <el-dialog v-model="dialog" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormsss"
        label-width="auto"
      >
        <el-form-item prop="account">
          <el-input
            v-model="ruleForm.account"
            placeholder="郵箱/用戶名/登錄手機"
          >
            <template #prepend>
              <i class="fa fa-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" placeholder="密碼">
            <template #prepend>
              <i class="fa fa-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">新增</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, unref, toRefs, reactive, defineComponent, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  props: {},
  components: {},
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const pattern = ref(null);

    const data = reactive({
      dialog: false,
    });

    // Form
    const ruleFormsss = ref(null);
    const ruleForm: any = reactive({
      account: "",
      password: "",
    });
    const rules = {
      account: [{ required: true, message: "请输入", trigger: "blur" }],
      password: [{ required: true, message: "请输入", trigger: "blur" }],
    };
    const submitForm = async () => {
      const form: any = unref(ruleFormsss);
      if (!form) return;
      try {
        await form.validate();
      } catch (error) {}
    };
    const ResetForm = async () => {
      const form: any = unref(ruleFormsss);
      try {
        await form.resetFields();
      } catch (error) {}
    };

    watch(
      () => data.dialog,
      () => {
        ResetForm();
      }
    );

    return {
      ...toRefs(data),
      route,
      router,
      store,
      pattern,
      ruleForm,
      ruleFormsss,
      rules,
      submitForm,
      ResetForm,
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
        color: $color-active;
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
        color: $color-active;
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
