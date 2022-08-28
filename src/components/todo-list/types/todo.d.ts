import type { UnwrapNestedRefs, ComputedRef } from 'vue'

export type Todo = {
  id: number;
  name: string;
  done: boolean;
};
export type FilterItem = {
  label: string;
  value: string;
};

export type TodoStateType = UnwrapNestedRefs<{
  todoList: Todo[];
  editingTodo: Todo | null;
  inputTodo: string;
}>

export type FilterStateType = UnwrapNestedRefs<{
  filterTag: string;
  filterItems: FilterItem[];
  filterList: ComputedRef<Array<Todo>>;
}>;
