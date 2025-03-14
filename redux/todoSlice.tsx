import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TodoProps, TodoSliceProps } from "@/types/todo";

export const fetchTodos = createAsyncThunk<TodoProps[], void>(
  "todos/fetchTodos",
  async () => {
    const response = await axios.get("/api/todos");
    return response.data as TodoProps[];
  }
);

export const addTodo = createAsyncThunk<TodoProps, { name: string; category?: string }>(
  "todos/addTodo",
  async (todoData) => {
    const response = await axios.post("/api/todos", todoData);
    return response.data as TodoProps;
  }
);

export const toggleTodo = createAsyncThunk<TodoProps, string>(
  "todos/toggleTodo",
  async (id) => {
    const response = await axios.patch(`/api/todos/${id}/toggle`);
    return response.data as TodoProps;
  }
);

export const deleteTodo = createAsyncThunk<string, string>(
  "todos/deleteTodo",
  async (id) => {
    await axios.delete(`/api/todos/${id}`);
    return id;
  }
);

export const editTodo = createAsyncThunk<
  TodoProps,
  { id: string; name: string; category?: string }
>("todos/editTodo", async ({ id, name, category }) => {
  const response = await axios.patch(`/api/todos/${id}`, { name, category });
  return response.data as TodoProps;
});

const initialState: TodoSliceProps = {
  todos: [],
  searchTerm: "",
  status: "idle",
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearTodos: (state) => {
      state.todos = [];
      state.searchTerm = "";
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error fetching todos";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export const { setSearchTerm, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;