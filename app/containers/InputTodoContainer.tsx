"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addTodo } from "../redux/todoSlice";
import InputTodo from "../components/todo/InputTodo";

const InputTodoContainer = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.auth?.user);
  
  const handleAdd = async () => {
    if (text.trim() && userId) {
      await dispatch(addTodo({ name: text, userId: userId.id as string }));
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
