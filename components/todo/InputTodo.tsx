import { InputTodoViewProps } from "@/types/todo";
import Modal from "@/components/ui-add/Modal";

const InputTodoView = ({
  text,
  onTextChange,
  onAdd,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  category,
  onCategoryChange,
}: InputTodoViewProps) => (
  <div className="flex gap-2">
    <button
      onClick={onOpenModal}
      title="Open Modal"
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add New Todo
    </button>
    <Modal isOpen={isModalOpen} onClose={onCloseModal} title="Add New Task">
      <div className="mb-4">
        <input
          type="text"
          value={text}
          onChange={onTextChange}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-400 dark:placeholder-gray-300"
          placeholder="Enter new todo"
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
        />
      </div>
      <label htmlFor="category" className="sr-only">
        Category
      </label>
      <select
        id="category"
        value={category}
        onChange={onCategoryChange}
        className="w-full px-3 py-2 border rounded mb-2 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="High Priority">High Priority</option>
      </select>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCloseModal}
          className="px-4 py-2 border rounded hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
        >
          Quay lại
        </button>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </Modal>
  </div>
);

export default InputTodoView;