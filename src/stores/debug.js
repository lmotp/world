import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDebugStore = defineStore("debug", () => {
  const isActive = computed(()=> );

  return { isActive };
});
