import { TodoItemViewProps } from "../../types/todo";

const TodoItemView = ({ todo, onToggle, onDetails }: TodoItemViewProps) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={onToggle}
      className="w-4 h-4 cursor-pointer"
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
      className="px-3 py-1 text-blue-500 hover:bg-blue-100 text-sm"
    >
      Details
    </button>
  </div>
);

export default TodoItemView;
