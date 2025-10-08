import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync, setPage, setSearch } from "../redux/todoSlice";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTodoAsync(title));
    dispatch(setSearch(""));
    dispatch(setPage(1));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new todo..."
        style={{ padding: "5px", width: "80%" }}
      />
      <button type="submit" style={{ padding: "5px 10px", marginLeft: "5px" }}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;