"use client";

import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { addTodo } from "../redux/todoSlice";
import InputTodo from "../components/todo/InputTodo";

const InputTodoContainer = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const handleAdd = async () => {
    if (text.trim()) {
      await dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <InputTodo
      text={text}
      onTextChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setText(e.target.value)
      }
      onAdd={handleAdd}
    />
  );
};

export default InputTodoContainer;
