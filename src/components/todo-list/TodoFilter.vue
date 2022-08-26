<template>
  <ul class="tag-list">
    <li
      v-for="item in items"
      :class="{ active: modelValue === item.value }"
      @click="emits('update:modelValue', item.value)"
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { FilterItem } from "./types/todo";
defineProps<{
  items: Array<FilterItem>;
  modelValue: string;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", modelValue: string): void;
}>();
</script>

<style scoped>
.tag-list {
  display: flex;
  padding: 10px;
  list-style: none;
}
.tag-list li {
  flex: 1;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}
.tag-list li.active {
  background-color: #fff;
}
</style>
