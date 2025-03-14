"use client";

import { TodoListProps } from "@/types/todo";
import InputTodoContainer from "@/containers/InputTodoContainer";
import SearchBarContainer from "@/containers/SearchBarContainer";
import TodoListContainer from "@/containers/TodoListContainer";

interface HomePageProps extends TodoListProps {
  onLogout: () => void;
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

const HomePage = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onLogout,
  selectedCategories,
  onCategoryChange,
  theme,
  onToggleTheme,
}: HomePageProps) => {
  const categories = [
    { name: "Work", color: "bg-blue-500" },
    { name: "Personal", color: "bg-green-500" },
    { name: "High Priority", color: "bg-red-500" },
  ];

  return (
    <div className={`min-h-screen py-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="max-w-2xl mx-auto bg-whit dark:bg-gray-700 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">Quản lý công việc</h1>
          <div className="flex gap-2">
            <button
              onClick={onToggleTheme}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </div>
        </div>
        <div>
          <InputTodoContainer />
          <SearchBarContainer />

          <div className="mb-6 mt-4">
            <h3 className="text-lg font-semibold mb-3">Lọc theo Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center">
                  <label
                    className={`flex items-center px-3 py-2 rounded-full cursor-pointer transition-all
                      ${
                        selectedCategories.includes(category.name)
                          ? `${category.color} text-white`
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => onCategoryChange(category.name)}
                      className="sr-only"
                    />
                    <span className="flex items-center">{category.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
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
};

export default HomePage;
