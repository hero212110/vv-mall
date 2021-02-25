import { ref, onMounted, watch } from "vue";
import UserService from "../../service/mock/user";
export default function useUserData() {
  const userData: any = ref([]);
  const getUserData: any = () => {
    userData.value = UserService.getUserData();
  };
  onMounted(getUserData);
  return { userData };
}
