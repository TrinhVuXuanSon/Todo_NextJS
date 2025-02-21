"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "../redux/hooks";
import { toggleTodo } from "../redux/todoSlice";
import TodoItem from "../components/todo/TodoItem";
import { TodoItemProps } from "@/app/types/todo";

const TodoItemContainer = ({ todo }: TodoItemProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleToggle = () => {
    dispatch(toggleTodo({ id: todo.id, completed: todo.completed }));
  };

  const handleDetails = () => router.push(`/pages/details/${todo.id}`);

  
  return (
    
    <TodoItem todo={todo} onToggle={handleToggle} onDetails={handleDetails} />
  );
};

export default TodoItemContainer;
