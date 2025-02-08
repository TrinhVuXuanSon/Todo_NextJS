"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleTodo } from "../redux/todoSlice";
import TodoItem from "../components/TodoItem";
import { TodoItemProps } from "@/app/types/todo";

const TodoItemContainer = ({ todo }: TodoItemProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleTodo(todo.id));
  const handleDetails = () => router.push(`/pages/details/${todo.id}`);

  return (
    <TodoItem todo={todo} onToggle={handleToggle} onDetails={handleDetails} />
  );
};

export default TodoItemContainer;
