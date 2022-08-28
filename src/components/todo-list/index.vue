<template>
  <div>
    <h1>TODO LIST</h1>
    <!-- Input -->
    <input
      type="text"
      class="todo-input"
      placeholder="please enter your todo"
      v-model="inputTodo"
      @keydown.enter="addTodo"
    />

    <!-- Content -->
    <ul class="todo-list">
      <li v-if="todoList.length == 0">暂时没有相关任务哦~~</li>
      <template v-else>
        <TodoItem
          v-for="todo in filterList"
          :key="todo.id"
          :todo="todo"
          v-model:editingTodo="editingTodo"
          @removeTodo="removeTodo"
        ></TodoItem>
      </template>
    </ul>
    <!-- Filter -->
    <TodoFilter :items="filterItems" v-model="filterTag"></TodoFilter>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
// components
import TodoItem from "./TodoItem.vue";
import TodoFilter from "./TodoFilter.vue";
// hooks
import { useTodo } from "./hooks/useTodo";
import { useFilter } from "./hooks/useFilter";

// todo相关逻辑
const { todoState, addTodo, removeTodo } = useTodo();
// filter相关逻辑
const filterState = useFilter(todoState);

// 解构方便调用
const { todoList, editingTodo, inputTodo } = toRefs(todoState);
const { filterTag, filterItems, filterList } = toRefs(filterState);
</script>

<style scoped>
.todo-input {
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  border-color: #ccc;
}
.todo-list {
  padding: 10px;
  list-style: none;
}
</style>
