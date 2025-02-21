"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  toggleTodo,
  deleteTodo,
  editTodo,
} from "../redux/todoSlice";
import { logout } from "../redux/authSlice";
import HomePage from "../components/todo/HomePage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const HomePageContainer = () => {
  const { todos, searchQuery, loading, error } = useAppSelector(
    (state) => state.todos
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  const filteredTodos = Array.isArray(todos)
  ? todos.filter((todo) =>
      todo?.name?.toLowerCase().includes((searchQuery || "").toLowerCase())
    )
  : [];

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}

  const handleToggle = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      dispatch(toggleTodo({ id, completed: todo.completed }));
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id: string, newName: string) => {
    dispatch(editTodo({ id, name: newName }));
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <HomePage
      todos={filteredTodos}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onLogout={handleLogout}
    />
  );
};

export default HomePageContainer;