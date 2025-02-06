import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import InputTodo from "../components/InputTodo";

const InputTodoContainer = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
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
