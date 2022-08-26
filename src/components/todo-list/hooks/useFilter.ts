import { FilterItem, Todo } from '../types/todo'
import { computed, reactive } from 'vue'

const filters: any = {
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
export const useFilter = (todoState: any) => {
  const filterState: any = reactive({
    filterTag: "all" as string,
    filterItems: [
      { label: "All", value: "all" },
      { label: "TODO", value: "todo" },
      { label: "DONE", value: "done" },
    ] as Array<FilterItem>,
    filterList: computed(() => {
      return filters[filterState.filterTag](todoState.todoList);
    })
  });
  return filterState
}