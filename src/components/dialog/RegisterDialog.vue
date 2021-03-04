<template>
  <el-dialog title v-model="currDialog" width="25%" @close="$emit('doClose')">
    <template #title>
      <p class="form-title">帳戶註冊</p>
    </template>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormsss"
      label-width="auto"
    >
      <el-form-item prop="account">
        <el-input v-model="ruleForm.account" placeholder="郵箱/用戶名/登錄手機">
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

      <el-form-item prop="confirm_password">
        <el-input v-model="ruleForm.confirm_password" placeholder="確認密碼">
          <template #prepend>
            <i class="fa fa-lock"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="danger" @click="submitForm">
          登入
        </el-button>
      </el-form-item>
      <el-form-item>
        <ul class="bot">
          已有帳戶?
          <li class="login" @click="switchDialog">
            <i class="fa fa-chevron-circle-right"></i>
            <span>點此登入</span>
          </li>
        </ul>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import {
  ref,
  unref,
  toRefs,
  reactive,
  defineComponent,
  watch,
  computed,
} from "vue";
import useBasicValue from "../../composables/basic/useBasicValue";
import AuthService from "../../service/mock/auth";
export default defineComponent({
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["doOpen", "doClose"],
  components: {},
  setup: (props, { emit }) => {
    const { route, router, store } = useBasicValue();
    const currDialog = computed(() => {
      return props.dialog;
    });
    const switchDialog = async () => {
      emit("doClose");
      emit("doOpen");
    };

    // Form
    const ruleFormsss = ref(null);
    const ruleForm: any = reactive({
      account: "",
      password: "",
      confirm_password: "",
    });
    const confirmPassword = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("請輸入密碼"));
      } else if (value !== ruleForm.password) {
        callback(new Error("兩次密碼輸入不一致!"));
      } else {
        callback();
      }
    };
    const rules = {
      account: [{ required: true, message: "請輸入用戶名", trigger: "blur" }],
      password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
      confirm_password: [{ validator: confirmPassword, trigger: "blur" }],
    };

    const submitForm = async () => {
      const form: any = unref(ruleFormsss);
      if (!form) return;
      try {
        await form.validate();
        let data = AuthService.register({ ruleForm });
        store.commit("auth/SET_AUTH", data);
        ElMessage({ message: "註冊成功", type: "success" });
        emit("doClose");
      } catch (error) {}
    };
    const ResetForm = async () => {
      const form: any = unref(ruleFormsss);
      try {
        await form.resetFields();
      } catch (error) {}
    };

    watch(
      () => props.dialog,
      () => {
        ResetForm();
      }
    );
    return {
      route,
      router,
      store,
      currDialog,
      switchDialog,
      ruleForm,
      confirmPassword,
      ruleFormsss,
      rules,
      submitForm,
      ResetForm,
    };
  },
});
</script>
<style lang="scss" scoped>
.form-title {
  color: #e4393c;
  font-size: 1.5em;
  font-weight: 600;
  border-bottom: 0.5px solid rgba($color: #000000, $alpha: 0.1);
}
.psw {
  position: absolute;
  top: 35px;
  right: 0;
  cursor: pointer;
  &:hover {
    color: #e4393c !important;
  }
}
.login-btn {
  margin-top: 20px;
  width: 100%;
  background: #e4393c !important;
  color: white !important;
  outline: none;
  border: none;
}
.bot {
  border-top: 0.5px solid rgba($color: #000000, $alpha: 0.1);
  display: flex;
  justify-content: flex-end;
  list-style: none;
  > li {
    cursor: pointer;
    &.login {
      margin-left: 10px;
      &:hover {
        color: #e4393c !important;
      }
    }
  }
}
</style>
