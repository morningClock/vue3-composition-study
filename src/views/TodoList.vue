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
      <li v-if="filterList.length == 0">暂时没有相关任务哦~~</li>
      <li
        class="todo-item"
        v-for="todo in filterList"
        :key="todo.id"
        :class="{ editing: todo === editingTodo }"
      >
        <div class="view">
          <!-- 状态 -->
          <input type="checkbox" v-model="todo.done" />
          <!-- 名称 -->
          <div
            class="text"
            :class="{ done: todo.done }"
            @dblclick="editTodo(todo)"
          >
            {{ todo.name }}
          </div>
          <!-- 操作按钮 -->
          <div class="del" @click="removeTodo(todo)">X</div>
        </div>
        <input
          v-if="todo === editingTodo"
          type="text"
          v-model="todo.name"
          v-focus
          @blur="updateTodo()"
          @keydown.enter="updateTodo()"
          @keyup.esc="cancelTodo(todo)"
        />
      </li>
    </ul>
    <!-- Filter -->
    <ul class="tag-list">
      <li :class="{ active: filterTag === 'all' }" @click="filterTag = 'all'">
        all
      </li>
      <li :class="{ active: filterTag === 'todo' }" @click="filterTag = 'todo'">
        todo
      </li>
      <li :class="{ active: filterTag === 'done' }" @click="filterTag = 'done'">
        done
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, watchEffect, computed } from "vue";

type Todo = {
  id: number;
  name: string;
  done: boolean;
};

export default {
  setup() {
    const state = reactive({
      todoList: JSON.parse(
        window.localStorage.getItem("TODO_LIST") || "[]"
      ) as Array<Todo>, // todo的列表
      cacheTodoName: "" as string,
      editingTodo: null as Todo | null,
      inputTodo: "" as string,
      filterTag: "all",
    });

    const filterList = computed(() => {
      if (state.filterTag == "all") {
        return state.todoList;
      } else if (state.filterTag == "todo") {
        return state.todoList.filter((item) => !item.done);
      } else {
        return state.todoList.filter((item) => item.done);
      }
    });

    // 新增任务
    const addTodo = () => {
      if (!state.inputTodo || state.inputTodo === "") return;
      const id = (state.todoList.slice(-1)[0]?.id || 0) + 1;
      const name = state.inputTodo;
      const todo: Todo = {
        id,
        name,
        done: false,
      };
      state.todoList.push(todo);
      state.inputTodo = "";
    };
    // 编辑任务
    const editTodo = (todo: Todo) => {
      state.editingTodo = todo;
      state.cacheTodoName = todo.name;
    };
    // 更新任务名称
    const updateTodo = () => {
      state.editingTodo = null;
    };
    // 取消编辑任务
    const cancelTodo = (todo: Todo) => {
      state.editingTodo = null;
      todo.name = state.cacheTodoName;
    };
    // 移除任务
    const removeTodo = (todo: Todo) => {
      state.todoList = state.todoList.filter((item) => item.id !== todo.id);
    };

    // 缓存
    watchEffect(() => {
      window.localStorage.setItem("TODO_LIST", JSON.stringify(state.todoList));
    });

    return {
      ...toRefs(state),
      filterList,
      addTodo,
      editTodo,
      updateTodo,
      cancelTodo,
      removeTodo,
    };
  },
  // 自定义指令
  directives: {
    focus: {
      mounted(el: any) {
        el.focus();
      },
    },
  },
};
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
