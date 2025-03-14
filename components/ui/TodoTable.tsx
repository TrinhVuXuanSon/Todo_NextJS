"use client";

import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropdownMenu from "./Dropdown";
import { TodoTableProps, TodoProps } from "@/types/todo";

const TodoTable: React.FC<TodoTableProps> = ({
  todos,
  title,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpenId(null);
      }
    };

    if (dropdownOpenId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpenId]);

  const handleEdit = (todo: TodoProps) => {
    onEdit(todo);
    setDropdownOpenId(null);
  };

  const handleDelete = (todo: TodoProps) => {
    onDelete(todo);
    setDropdownOpenId(null);
  };

  const toggleDropdown = (todoId: string) => {
    setDropdownOpenId(dropdownOpenId === todoId ? null : todoId);
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2 dark:text-white">
        {title} ({todos.length})
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
            <th className="w-[50px] py-3 px-4 text-left dark:text-white">
              Done
            </th>
            <th className="py-3 px-4 text-left dark:text-white">Task</th>
            <th className="py-3 px-4 text-left dark:text-white">Category</th>
            <th className="w-[100px] py-3 px-4 text-left dark:text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr
              key={todo.id}
              className="border-b dark:border-gray-600 dark:text-white"
            >
              <td className="py-3 px-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggle(todo.id)}
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-500"
                  title="checkbox"
                />
              </td>
              <td className="py-3 px-4 font-medium">{todo.name}</td>
              <td className="py-3 px-4">{todo.category || "None"}</td>
              <td className="py-3 px-4 relative">
                <div ref={dropdownOpenId === todo.id ? dropdownRef : null}>
                  <button
                    onClick={() => toggleDropdown(todo.id)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                    title="Actions"
                  >
                    <BsThreeDotsVertical className="w-5 h-5 dark:text-white" />
                  </button>
                  {dropdownOpenId === todo.id && (
                    <DropdownMenu
                      onEdit={() => handleEdit(todo)}
                      onDelete={() => handleDelete(todo)}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
