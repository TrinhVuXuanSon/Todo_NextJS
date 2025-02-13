"use client";

import { TodoListProps } from "../../types/todo";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/app/components/ui/table";

const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps) => {
  const router = useRouter();
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const handleDetails = (todoId: string) => {
    router.push(`/pages/details/${todoId}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-2">
          Danh sách công việc đang thực hiện ({incompleteTodos.length})
        </h2>
        <Table className="w-full border border-gray-200">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[100px] text-center">Status</TableHead>
              <TableHead>Tên công việc</TableHead>
              <TableHead className="w-[150px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incompleteTodos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </TableCell>
                <TableCell>{todo.name}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDetails(todo.id)}
                    className="px-3 py-1 text-blue-500 hover:bg-blue-100 text-sm"
                  >
                    Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Danh sách công việc đã hoàn thành ({completedTodos.length})
          </h2>
          <Table className="w-full border border-gray-200">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-[100px] text-center">Status</TableHead>
                <TableHead>Tên công việc</TableHead>
                <TableHead className="w-[150px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedTodos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => onToggle(todo.id)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>{todo.name}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDetails(todo.id)}
                      className="px-3 py-1 text-blue-500 hover:bg-blue-100 text-sm"
                    >
                      Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TodoList;
