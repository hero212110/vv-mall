<template>
  <el-dialog title v-model="currDialog" width="25%" @close="$emit('doClose')">
    <template #title>
      <p class="form-title">帳戶登入</p>
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
        <p class="psw">忘記密碼</p>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submitForm">
          登入
        </el-button>
      </el-form-item>
      <el-form-item>
        <ul class="bot">
          <li>
            <div class="icon">
              <img src="../../assets/images/google.png" />
            </div>
          </li>
          <li class="register" @click="switchDialog">
            <i class="fa fa-chevron-circle-right"></i>
            <span>立即註冊</span>
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
    });
    const rules = {
      account: [{ required: true, message: "請輸入用戶名", trigger: "blur" }],
      password: [{ required: true, message: "請輸入密碼", trigger: "blur" }],
    };
    const submitForm = async () => {
      const form: any = unref(ruleFormsss);
      if (!form) return;
      try {
        await form.validate();
        let data = AuthService.login({ ruleForm });
        store.commit("auth/SET_AUTH", data);
        ElMessage({ message: "登入成功", type: "success" });
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
  color: $color-primary;
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
    color: $color-primary !important;
  }
}
.login-btn {
  margin-top: 20px;
  width: 100%;
  outline: none;
  border: none;
}
.bot {
  border-top: 0.5px solid rgba($color: #000000, $alpha: 0.1);
  display: flex;
  justify-content: space-between;
  list-style: none;
  > li {
    cursor: pointer;
    .icon {
      > img {
        margin-top: 10px;
        width: 20px;
        height: 20px;
      }
    }
    &.register {
      &:hover {
        color: $color-primary !important;
      }
    }
  }
}
</style>
