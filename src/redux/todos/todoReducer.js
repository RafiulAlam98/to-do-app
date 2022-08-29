import {
  ADDED,
  ALLCOMPLETE,
  CLEARCOMPLETED,
  COLORSELECTED,
  DELETE,
  TOGGLED,
} from './actionType';
import { initialState } from './initialState';

const nextTodoId = todos => {
  const maxId = todos.reduce((maxId, todoId) => Math.max(maxId, todoId.id), -1);
  return maxId;
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDED:
      return [
        ...state,
        {
          id: nextTodoId(state),
        },
      ];

    case TOGGLED:
      return state.map(todo => {
        if (todo.id !== action.payload) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed,
        };
      });

    case COLORSELECTED:
      const { todoId, color } = action.payload;
      return state.map(todo => {
        if (todo.id !== todoId) {
          return todo;
        }
        return {
          ...todo,
          color: color,
        };
      });

    case DELETE:
      return state.filter(todo => todo.id !== action.payload);

    case ALLCOMPLETE:
      return state.map(todo => {
        return {
          ...todo,
          complete: true,
        };
      });

    case CLEARCOMPLETED:
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
};

export default todoReducer;