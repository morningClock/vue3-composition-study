import { reactive, watchEffect } from 'vue';
import { Todo, TodoStateType } from '../types/todo'


export const useTodo = () => {
  const todoState: TodoStateType = reactive({
    todoList: JSON.parse(
      window.localStorage.getItem("TODO_LIST") || "[]"
    ),
    editingTodo: null, //正在编辑的todo
    inputTodo: "",
  });

  // 新增任务
  const addTodo = () => {
    if (!todoState.inputTodo || todoState.inputTodo === "") return;
    const id = (todoState.todoList.slice(-1)[0]?.id || 0) + 1;
    const name = todoState.inputTodo;
    const todo: Todo = {
      id,
      name,
      done: false,
    };
    todoState.todoList.push(todo);
    todoState.inputTodo = "";
  };
  // 移除任务
  const removeTodo = (todo: Todo) => {
    todoState.todoList = todoState.todoList.filter((item: Todo) => item.id !== todo.id);
  };

  // 缓存
  watchEffect(() => {
    window.localStorage.setItem("TODO_LIST", JSON.stringify(todoState.todoList));
  });

  return {
    todoState,
    addTodo,
    removeTodo
  }
}