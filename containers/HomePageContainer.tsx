"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";
import useDebounce from "@/hooks/useDebounce";
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

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(fetchTodos());
      axios
        .get("/api/user/profile")
        .then((res) => {
          const userTheme =
            (res.data as { theme?: "light" | "dark" }).theme || "light";
          setTheme(userTheme);
          document.documentElement.classList.toggle(
            "dark",
            userTheme === "dark"
          );
        })
        .catch((err) => {
          console.error("Error fetching theme:", err);
          setTheme("light");
          document.documentElement.classList.toggle("dark", false);
        });
    }
  }, [dispatch, session?.user?.id]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleToggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    try {
      await axios.patch("/api/user/theme", { theme: newTheme });
    } catch (error) {
      console.error("Error updating theme:", error);
    }
  };

  const filteredTodos = Array.isArray(todos)
    ? todos.filter((todo) => {
        const matchesSearch = todo?.name
          ?.toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(todo.category || "");
        return matchesSearch && matchesCategory;
      })
    : [];

  const handleToggle = async (id: string) => {
    await dispatch(toggleTodo(id));
  };

  const handleEdit = async (id: string, name: string, category?: string) => {
    await dispatch(editTodo({ id, name, category }));
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
      selectedCategories={selectedCategories}
      onCategoryChange={handleCategoryChange}
      theme={theme}
      onToggleTheme={handleToggleTheme}
    />
  );
};

export default HomePageContainer;