import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import InputTodo from "../components/todo/InputTodo";

const InputTodoContainer = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = async () => {
    if (text.trim()) {
      await dispatch(addTodo(text) as any);
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
