import { TodoListProps } from "../../types/todo";
import TodoItemContainer from "../../containers/TodoItemContainer";

const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps) => {
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div>
      <div className="my-4">
        <h2 className="text-lg font-semibold my-2">
          Đang thực hiện ({incompleteTodos.length})
        </h2>
        {incompleteTodos.map((todo) => (
          <TodoItemContainer
            key={todo.id}
            todo={todo}
            onToggle={() => onToggle(todo.id)}
            onDelete={() => onDelete(todo.id)}
            onEdit={() => onEdit(todo.id, todo.name)}
          />
        ))}
      </div>
      {completedTodos.length >= 0 && (
        <div className="my-4">
          <h2 className="text-lg font-semibold my-2">
            Đã hoàn thành ({completedTodos.length})
          </h2>
          {completedTodos.map((todo) => (
            <TodoItemContainer
              key={todo.id}
              todo={todo}
              onToggle={() => onToggle(todo.id)}
              onDelete={() => onDelete(todo.id)}
              onEdit={() => onEdit(todo.id, todo.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
