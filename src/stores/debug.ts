import { ref } from "vue";
import { defineStore } from "pinia";

export const useDebugStore = defineStore("debug", () => {
  const isDebugActive = ref(false);

  return { isDebugActive };
});
