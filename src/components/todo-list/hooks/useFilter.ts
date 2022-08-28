import { FilterStateType, Todo, TodoStateType } from '../types/todo'
import { computed, reactive } from 'vue'
// 所有key类型值
type FiltersKeyType = keyof typeof filters;

const filters = {
  all(todoList: Array<Todo>) {
    return todoList;
  },
  todo(todoList: Array<Todo>) {
    return todoList.filter((item) => !item.done);
  },
  done(todoList: Array<Todo>) {
    return todoList.filter((item) => item.done);
  },
};
export const useFilter = (todoState: TodoStateType) => {
  const filterState: FilterStateType = reactive({
    filterTag: "all",
    filterItems: [
      { label: "All", value: "all" },
      { label: "TODO", value: "todo" },
      { label: "DONE", value: "done" },
    ],
    filterList: computed(() => {
      return filters[filterState.filterTag as FiltersKeyType](todoState.todoList);
    })
  });

  return filterState
}