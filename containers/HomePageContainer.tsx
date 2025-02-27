"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  editTodo,
} from "../redux/todoSlice";
import { logout } from "@/redux/authSlice";
import HomePage from "@/components/todo/HomePage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const HomePageContainer = () => {
  const { todos, searchTerm, status, error } = useAppSelector(
    (state) => state.todos
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const filteredTodos = Array.isArray(todos)
    ? todos.filter((todo) =>
        todo?.name?.toLowerCase().includes((searchTerm || "").toLowerCase())
      )
    : [];

  const handleToggle = (id: string) => {
    dispatch(toggleTodo(id));
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
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

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
