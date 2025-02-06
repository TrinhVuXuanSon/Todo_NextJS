import { TodoListProps } from "../types/todo";
import InputTodoContainer from "../containers/InputTodoContainer";
import SearchBarContainer from "../containers/SearchBarContainer";
import TodoList from "./TodoList";

const HomePage = ({ todos, onToggle, onDelete, onEdit }: TodoListProps) => (
  <div className="min-h-screen bg-gray-100 py-8">
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-5 text-center">Quản lý công việc</h1>
      <div>
        <InputTodoContainer />
        <SearchBarContainer />
      </div>

      <TodoList
        todos={todos}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  </div>
);

export default HomePage;
