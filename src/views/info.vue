<template>
  <div class="wrapper">
    <!-- <h1>info</h1> -->
    <!-- <p>{{ store.state.count }}</p> -->
    <div class="feature-wrapper">
      <div class="crud">
        <el-button type="success" @click="dialog = true">ADD</el-button>
        <el-button type="danger" @click="removeData">DELETE</el-button>
        <el-button type="primary" @click="reloadData">RELOAD</el-button>
      </div>
      <div class="search">
        <el-input v-model="pattern" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <el-table
      :data="filteredData"
      v-loading="loading"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>

    <el-dialog v-model="dialog" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormsss">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">新增</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import {
  ref,
  unref,
  toRefs,
  reactive,
  defineComponent,
  computed,
  onMounted,
} from "vue";
import useBasicValue from "../composables/basic/useBasicValue";
import UserService from "../service/mock/user";
export default defineComponent({
  props: {},
  components: {},
  setup: () => {
    const { route, router, store } = useBasicValue();
    const data = reactive({
      pattern: "",
      loading: false,
      dialog: false,
    });
    let userData: any = ref([]);

    // Form
    const ruleFormsss = ref(null);
    const ruleForm: any = reactive({
      name: "",
      address: "",
    });
    const rules = {
      name: [{ required: true, message: "请输入", trigger: "blur" }],
      address: [{ required: true, message: "请输入", trigger: "blur" }],
    };
    const submitForm = async () => {
      const form: any = unref(ruleFormsss);
      if (!form) return;
      try {
        await form.validate();
        addData();
      } catch (error) {}
    };
    const ResetForm = () => {
      ruleForm.name = null;
      ruleForm.address = null;
    };
    // Table
    const addData = () => {
      const { name, address } = ruleForm;
      const date = new Date().toDateString();
      userData.value.push({ date, name, address });
      store.commit("SET_USER_DATA", userData.value);
      ResetForm();
      data.dialog = false;
    };
    const removeData = () => {
      if (userData.value.length > 0) {
        userData.value.length = userData.value.length - 1;
        store.commit("SET_USER_DATA", userData.value);
      }
    };
    const reloadData = () => {
      data.loading = true;
      setTimeout(() => {
        data.loading = false;
      }, 2000);
    };
    const filteredData = computed(() => {
      if (!data.pattern) {
        return userData.value;
      } else {
        return userData.value.filter((e: any) => {
          if (e.name.indexOf(data.pattern) != -1) {
            return e;
          }
        });
      }
    });
    onMounted(() => {
      if (store.state.userData && store.state.userData?.length > 0) {
        userData.value = store.state.userData;
      } else {
        userData.value = UserService.getUserData();
      }
    });

    return {
      ...toRefs(data),
      route,
      router,
      store,
      ruleForm,
      rules,
      submitForm,
      ruleFormsss,
      userData,
      filteredData,
      removeData,
      reloadData,
    };
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  .feature-wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px 0;
    .crud {
      width: 70%;
      display: flex;
      justify-content: flex-start;
    }
    .search {
      width: 30%;
    }
  }

  > h1 {
    color: $color-blue;
  }
  > p {
    color: green;
  }
}
</style>
