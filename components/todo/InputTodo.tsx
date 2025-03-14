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
  onCategoryChange
}: InputTodoViewProps) => (
  <div className="flex gap-2">
    <button
      onClick={onOpenModal}
      title="Open Modal"
      className="px-3 py-1 bg-blue-500 text-white rounded"
    >
      Add New Todo
    </button>
    <Modal isOpen={isModalOpen} onClose={onCloseModal} title="Add New Task">
      <div className="mb-4">
        <input
          type="text"
          value={text}
          onChange={onTextChange}
          className="w-full px-3 py-2 border rounded"
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
        className="w-full px-3 py-2 border rounded mb-2"
      >
        <option value="">Select Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="High Priority">High Priority</option>
      </select>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCloseModal}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Quay lại
        </button>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </Modal>
  </div>
);

export default InputTodoView;
