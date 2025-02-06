import { useSelector, useDispatch } from "react-redux";
import { HomePageProps } from "../types/todo";
import { toggleTodo, deleteTodo, editTodo } from "../redux/todoSlice";
import HomePage from "../components/HomePage";

const HomePageContainer = () => {
  const { todos, searchTerm } = useSelector(
    (state: HomePageProps) => state.todos
  );

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
  return (
    <HomePage
      todos={filteredTodos}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
};

export default HomePageContainer;
