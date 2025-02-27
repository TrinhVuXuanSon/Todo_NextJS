import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TodoProps, TodoSliceProps } from "@/types/todo";

export const fetchTodos = createAsyncThunk<TodoProps[], void>(
  "todos/fetchTodos",
  async () => {
    const response = await axios.get("/api/todos");
    return response.data as TodoProps[];
  }
);

export const addTodo = createAsyncThunk<TodoProps, string>(
  "todos/addTodo",
  async (name) => {
    const response = await axios.post("/api/todos", { name, completed: false });
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
  { id: string; name: string }
>("todos/editTodo", async ({ id, name }) => {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) throw new Error("Failed to edit todo");
  return (await response.json()) as TodoProps;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTodos.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.todos = action.payload;
        }
      )
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error fetching todos";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(
        toggleTodo.fulfilled,
        (state, action) => {
          const todo = state.todos.find(
            (todo) => todo.id === action.payload.id
          );
          if (todo) {
            todo.completed = action.payload.completed;
          }
        }
      )
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(
        editTodo.fulfilled,
        (state, action) => {
          const index = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
          );
          if (index !== -1) {
            state.todos[index].name = action.payload.name;
          }
        }
      );
  },
});

export const { setSearchTerm } = todoSlice.actions;
export default todoSlice.reducer;
