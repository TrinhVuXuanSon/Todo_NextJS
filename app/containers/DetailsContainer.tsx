"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo } from "../redux/todoSlice";
import { RootStateProps, TodoProps } from "../types/todo";
import DetailsView from "@/app/components/todo/DetailsView";

const DetailsContainer = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const dispatch = useDispatch();

  const todo = useSelector((state: RootStateProps) =>
    state.todos.todos.find((todo: TodoProps) => todo.id === id)
  );

  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (todo) {
      setEditText(todo.name);
    }
  }, [todo]);

  const handleSave = () => {
    if (editText.trim() && id) {
      dispatch(editTodo({ id, name: editText }));
      router.push("/");
      setTimeout(() => {
        alert("Saved");
      }, 300);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      dispatch(deleteTodo(id));
      router.push("/");
      setTimeout(() => {
        alert("Deleted");
      }, 300);
    }
  };

  return (
    <DetailsView
      todo={todo}
      editText={editText}
      onEditChange={setEditText}
      onSave={handleSave}
      onDelete={handleDelete}
      onBack={() => router.push("/")}
    />
  );
};

export default DetailsContainer;
