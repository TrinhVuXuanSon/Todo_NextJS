"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addTodo } from "@/redux/todoSlice";
import InputTodo from "@/components/todo/InputTodo";

const InputTodoContainer = () => {
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const dispatch = useAppDispatch();

  const handleAdd = async () => {
    if (text.trim()) {
      await dispatch(addTodo({ name: text, category }));
      setText("");
      setCategory("");
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setText("");
    setCategory("");
  };

  return (
    <InputTodo
      text={text}
      onTextChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setText(e.target.value)
      }
      category={category}
      onCategoryChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setCategory(e.target.value)
      }
      onAdd={handleAdd}
      isModalOpen={isModalOpen}
      onOpenModal={handleOpenModal}
      onCloseModal={handleCloseModal}
    />
  );
};

export default InputTodoContainer;
