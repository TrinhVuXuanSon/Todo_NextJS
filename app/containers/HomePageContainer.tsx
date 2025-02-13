import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { HomePageProps } from "../types/todo";
import {
  fetchTodos,
  toggleTodo,
  deleteTodo,
  editTodo,
} from "../redux/todoSlice";
import { logout } from "../redux/authSlice";
import HomePage from "../components/todo/HomePage";

const HomePageContainer = () => {
  const { todos, searchTerm, status, error } = useSelector(
    (state: HomePageProps) => state.todos
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos() as any);
    }
  }, [status, dispatch]);

  const filteredTodos = Array.isArray(todos) ? todos.filter((todo) =>
    todo?.name?.toLowerCase().includes((searchTerm || '').toLowerCase())
  ) : [];

  const handleToggle = (id: string) => {
    dispatch(toggleTodo(id) as any);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id) as any);
  };

  const handleEdit = (id: string, newName: string) => {
    dispatch(editTodo({ id, name: newName }) as any);
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