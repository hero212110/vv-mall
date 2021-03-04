import { ElMessage } from "element-plus";
const namespaced = true;
const state = {
  isLogined: false,
  token: null,
};
const getters = {};
const mutations = {
  SET_AUTH(state: any, v: any) {
    const { isLogined, token } = v;
    state.isLogined = isLogined;
    state.token = token;
    localStorage.setItem("auth", JSON.stringify(state));
  },
  REMOVE_AUTH(state: any) {
    state.isLogined = false;
    state.token = null;
    localStorage.setItem("auth", JSON.stringify(state));
    ElMessage({ message: "登出成功", type: "success" });
  },
  RESTORE_AUTH(state: any, v: any) {
    const { isLogined, token } = v;
    state.isLogined = isLogined;
    state.token = token;
    localStorage.setItem("auth", JSON.stringify(state));
  },
};
const actions = {};
export default { namespaced, state, getters, mutations, actions };
