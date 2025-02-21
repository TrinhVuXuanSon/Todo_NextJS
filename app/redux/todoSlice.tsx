'use client';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TodoProps } from '@/app/types/todo';

interface TodoState {
  todos: TodoProps[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  searchQuery: '',
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/todos?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to fetch todos");
      return data;
    } catch (error) {;
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch todos");
    }
  }
);


export const addTodo = createAsyncThunk(
  'todos/addTodoAsync',
  async ({ name, userId }: { name: string; userId: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, userId }),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add todo');
    }
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodoAsync',
  async ({ id, completed }: { id: string; completed: boolean }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!response.ok) throw new Error('Failed to toggle todo');
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to toggle todo');
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete todo');
    }
  }
);

export const editTodo = createAsyncThunk(
  'todos/editTodoAsync',
  async ({ id, name }: { id: string; name: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error('Failed to edit todo');
      return { id, name };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to edit todo');
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.unshift(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload);
        if (todo) {
          todo.completed = !todo.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.name = action.payload.name;
        }
      });
  },
});

export const { setSearchTerm } = todoSlice.actions;
export default todoSlice.reducer;
