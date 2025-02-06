import { InputTodoViewProps } from "../types/todo";

const InputTodoView = ({ text, onTextChange, onAdd }: InputTodoViewProps) => (
  <div className="flex gap-2">
    <input
      type="text"
      value={text}
      onChange={onTextChange}
      className="flex-1 px-2 py-1 border rounded"
      placeholder="Add new todo"
    />
    <button
      onClick={onAdd}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Add
    </button>
  </div>
);

export default InputTodoView;
