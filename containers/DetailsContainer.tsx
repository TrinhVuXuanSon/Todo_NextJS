"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteTodo, editTodo } from "@/redux/todoSlice";
import DetailsView from "@/components/todo/DetailsView";
import { TodoProps } from "@/types/todo";

const DetailsContainer = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const id = typeof params.id === "string" ? params.id : "";

  const todo = useAppSelector((state) =>
    state.todos.todos.find((todo: TodoProps) => todo.id === id)
  );

  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (todo) {
      setEditText(todo.name);
    }
  }, [todo]);

  useEffect(() => {
    if (!todo && id) {
      alert("Todo not found!");
      router.push("/");
    }
  }, [todo, id, router]);

  const handleSave = async () => {
    if (editText.trim() && id) {
      await dispatch(editTodo({ id, name: editText })).unwrap(); 
      router.push("/");
      setTimeout(() => {
        alert("Saved");
      }, 300);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Có chắc xóa todo này?")) {
      await dispatch(deleteTodo(id)).unwrap();
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
