import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default function basicValue() {
  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  return { route, router, store };
}
