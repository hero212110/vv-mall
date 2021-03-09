import { ElMessage } from "element-plus";
const namespaced = true;
const state = {
  currCategory: {
    id: "",
    sub: "",
  },
};
const getters = {};
const mutations = {
  SET_CATEGORY(state: any, v: any) {
    state.currCategory.id = v.id;
    state.currCategory.sub = v.sub;
  },
};
const actions = {};
export default { namespaced, state, getters, mutations, actions };
