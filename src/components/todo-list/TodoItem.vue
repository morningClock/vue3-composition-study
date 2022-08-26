<template>
  <li class="todo-item" :class="{ editing: todo === editingTodo }">
    <div class="view">
      <!-- 状态 -->
      <input type="checkbox" v-model="todo.done" />
      <!-- 名称 -->
      <div class="text" :class="{ done: todo.done }" @dblclick="editTodo(todo)">
        {{ todo.name }}
      </div>
      <!-- 操作按钮 -->
      <div class="del" @click="removeTodo(todo)">X</div>
    </div>
    <input
      v-if="todo === editingTodo"
      type="text"
      v-model="todo.name"
      v-focus="todo.id === editingTodo.id"
      @blur="updateTodo()"
      @keydown.enter="updateTodo()"
      @keyup.esc="cancelTodo(todo)"
    />
  </li>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Todo } from "./types/todo";

// props
defineProps<{
  todo: Todo;
  editingTodo?: Todo | null;
}>();
// 派发事件
const emits = defineEmits<{
  (e: "removeTodo", todo: Todo): void;
  (e: "update:editingTodo", todo: Todo | null): void;
}>();
// state仓库
const state = reactive({
  cacheTodoName: "" as string,
});

// 编辑任务
const editTodo = (todo: Todo) => {
  emits("update:editingTodo", todo);
  state.cacheTodoName = todo.name;
};
// 更新任务名称
const updateTodo = () => {
  emits("update:editingTodo", null);
};
// 取消编辑任务
const cancelTodo = (todo: Todo) => {
  emits("update:editingTodo", null);
  todo.name = state.cacheTodoName;
};
// 移除任务
const removeTodo = (todo: Todo) => {
  emits("removeTodo", todo);
};

// 指令
const vFocus = {
  mounted: (el: any, binding: boolean) => {
    if (binding) {
      el.focus();
    }
  },
};
</script>

<style scoped>
.todo-item {
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.todo-item .view {
  display: flex;
}
.todo-item .view .text {
  flex: 1;
}
.todo-item .view .text.done {
  text-decoration: line-through;
  color: #ccc;
}
.todo-item .view .del {
  width: 30px;
  color: #ccc;
  font-size: 12px;
}
.todo-item .view .del:hover {
  color: black;
  cursor: pointer;
}

.todo-item.editing .view {
  display: none;
}
</style>
