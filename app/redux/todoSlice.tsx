import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../lib/supabaseClient";
import { TodoSliceProps } from "../types/todo";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) throw error;
  return data;
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (name: string) => {
    const { data, error } = await supabase
      .from("todos")
      .insert([{ name, completed: false }])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
);

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id: string) => {
    const { data: currentTodo, error: fetchError } = await supabase
      .from("todos")
      .select("completed")
      .eq("id", id)
      .single();

    if (fetchError || !currentTodo) throw new Error("Todo not found");

    const { data, error } = await supabase
      .from("todos")
      .update({ completed: !currentTodo.completed })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id: string) => {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
  return id;
});

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, name }: { id: string; name: string }) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ name })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
);

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
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export const { setSearchTerm } = todoSlice.actions;
export default todoSlice.reducer;
