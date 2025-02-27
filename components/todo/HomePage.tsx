"use client";

import { TodoListProps } from "@/types/todo";
import InputTodoContainer from "@/containers/InputTodoContainer";
import SearchBarContainer from "@/containers/SearchBarContainer";
import TodoListContainer from "@/containers/TodoListContainer";

const HomePage = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onLogout,
}: TodoListProps & { onLogout: () => void }) => (
  <div className="min-h-screen bg-gray-100 py-8">
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Quản lý công việc</h1>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>
      <div>
        <InputTodoContainer />
        <SearchBarContainer />
      </div>

      <TodoListContainer
        todos={todos}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  </div>
);

export default HomePage;
