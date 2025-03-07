"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  editTodo,
} from "@/redux/todoSlice";
import { logout } from "@/redux/authSlice";
import HomePage from "@/components/todo/HomePage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const HomePageContainer = () => {
  const { todos, searchTerm, status, error } = useAppSelector(
    (state) => state.todos
  );
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(fetchTodos());
    }
  }, [dispatch, session?.user?.id]);

  const filteredTodos = Array.isArray(todos)
    ? todos.filter((todo) =>
        todo?.name?.toLowerCase().includes((searchTerm || "").toLowerCase())
      )
    : [];

    const handleToggle = async (id: string) => {
      await dispatch(toggleTodo(id));
    };
  
    const handleEdit = async (id: string, name: string) => {
      await dispatch(editTodo({ id, name }));
    };
  
    const handleDelete = async (id: string) => {
      await dispatch(deleteTodo(id));
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
