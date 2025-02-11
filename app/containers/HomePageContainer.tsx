import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { HomePageProps } from "../types/todo";
import { toggleTodo, deleteTodo, editTodo } from "../redux/todoSlice";
import { logout } from "../redux/authSlice";
import HomePage from "../components/todo/HomePage";

const HomePageContainer = () => {
  const { todos, searchTerm } = useSelector(
    (state: HomePageProps) => state.todos
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const filteredTodos = todos.filter((todo) =>
    todo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
