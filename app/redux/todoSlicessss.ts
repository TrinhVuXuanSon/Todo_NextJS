// "use client";

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";
// import { TodoSliceProps } from "@/app/types/todo";

// const initialState: TodoSliceProps = {
//   todos: [],
//   searchTerm: "",
// };

// export const todoSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     addTodo: (state, action: PayloadAction<string>) => {
//       return {
//         ...state,
//         todos: [
//           { id: uuidv4(), name: action.payload, completed: false },
//           ...state.todos,
//         ],
//       };
//     },
//     toggleTodo: (state, action: PayloadAction<string>) => {
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.payload
//             ? { ...todo, completed: !todo.completed }
//             : todo
//         ),
//       };
//     },
//     deleteTodo: (state, action: PayloadAction<string>) => {
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.payload),
//       };
//     },
//     editTodo: (state, action: PayloadAction<{ id: string; name: string }>) => {
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.payload.id
//             ? { ...todo, name: action.payload.name }
//             : todo
//         ),
//       };
//     },
//     setSearchTerm: (state, action: PayloadAction<string>) => {
//       return {
//         ...state,
//         searchTerm: action.payload,
//       };
//     },
//   },
// });

// export const { addTodo, toggleTodo, deleteTodo, editTodo, setSearchTerm } =
//   todoSlice.actions;
// export default todoSlice.reducer;
