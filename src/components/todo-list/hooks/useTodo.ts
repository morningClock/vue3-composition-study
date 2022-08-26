import { reactive, watchEffect } from 'vue';
import { Todo } from '../types/todo'

export const useTodo = () => {
  const todoState = reactive({
    todoList: JSON.parse(
      window.localStorage.getItem("TODO_LIST") || "[]"
    ) as Array<Todo>,
    editingTodo: null as Todo | null, //正在编辑的todo
    inputTodo: "" as string,
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
    todoState.todoList = todoState.todoList.filter((item) => item.id !== todo.id);
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