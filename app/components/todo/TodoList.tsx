"use client";

import TodoTable from "../ui/TodoTable";
import Modal from "../ui/Modal";
import { TodoProps } from "../../types/todo";

interface TodoListViewProps {
  todos: TodoProps[];
  onToggle: (id: string) => void;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedTodo: { id: string; name: string } | null;
  editedName: string;
  onEditNameChange: (value: string) => void;
  onEditClick: (todo: TodoProps) => void;
  onDeleteClick: (todo: TodoProps) => void;
  onEditSubmit: () => void;
  onDeleteSubmit: () => void;
  onCloseModals: () => void;
}

const TodoList = ({
  todos,
  onToggle,
  isEditModalOpen,
  isDeleteModalOpen,
  editedName,
  onEditNameChange,
  onEditClick,
  onDeleteClick,
  onEditSubmit,
  onDeleteSubmit,
  onCloseModals,
}: TodoListViewProps) => {
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="space-y-8">
      <TodoTable
        todos={incompleteTodos}
        title="Danh sách công việc đang thực hiện"
        onToggle={onToggle}
        onEdit={onEditClick}
        onDelete={onDeleteClick}
      />
      {completedTodos.length > 0 && (
        <TodoTable
          todos={completedTodos}
          title="Danh sách công việc đã hoàn thành"
          onToggle={onToggle}
          onEdit={onEditClick}
          onDelete={onDeleteClick}
        />
      )}

      <Modal isOpen={isEditModalOpen} onClose={onCloseModals} title="Edit Task">
        <div className="mb-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input
              id="name"
              value={editedName}
              onChange={(e) => onEditNameChange(e.target.value)}
              className="col-span-3 border rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCloseModals}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onEditSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save changes
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={onCloseModals}
        title="Are you sure?"
      >
        <p className="text-gray-500">
          Bạn có chắc chắn muốn xoá công việc này không?
        </p>
        <div className="flex mt-4 justify-end gap-2">
          <button
            onClick={onCloseModals}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onDeleteSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
