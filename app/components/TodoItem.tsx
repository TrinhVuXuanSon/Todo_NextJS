import { TodoItemViewProps } from "../types/todo";

const TodoItemView = ({ todo, onToggle, onDetails }: TodoItemViewProps) => (
  <div className="my-2 flex items-center gap-2 p-1 border rounded-md hover:bg-gray-100">
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={onToggle}
      className="w-4 h-4 cursor-pointer mx-2"
      title="toggle"
    />
    <span
      className={`flex-1 cursor-pointer ${
        todo.completed ? "line-through text-gray-500" : ""
      }`}
    >
      {todo.name}
    </span>
    <button
      onClick={onDetails}
      className="px-3 py-1 text-blue-500 rounded hover:bg-blue-100 text-lg"
    >
      Details
    </button>
  </div>
);

export default TodoItemView;
