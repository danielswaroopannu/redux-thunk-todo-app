import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodoAsync, updateTodoAsync } from "../redux/todoSlice";

const TodoList = ({ todos }) => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleDelete = (id) => {
    dispatch(deleteTodoAsync(id));
  };

  const handleUpdate = (id) => {
    if (!editTitle.trim()) return;
    dispatch(updateTodoAsync({ id, title: editTitle }));
    setEditId(null);
    setEditTitle("");
  };

  const handleToggle = (todo) => {
    dispatch(updateTodoAsync({
      id: todo.id,
      title: todo.title || "", // preserve title
      completed: !todo.completed,
    }));
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => {
        if (!todo || !todo.id) return null; // defensive check

        return (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ padding: "5px", width: "70%" }}
                />
                <button onClick={() => handleUpdate(todo.id)} style={{ marginLeft: "5px" }}>
                  Save
                </button>
                <button onClick={() => setEditId(null)} style={{ marginLeft: "5px" }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "gray" : "black",
                  }}
                >
                  {todo.title || "Untitled"}
                </span>
                <button
                  onClick={() => {
                    setEditId(todo.id);
                    setEditTitle(todo.title || "");
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: "5px" }}>
                  Delete
                </button>
                <button
                  onClick={() => handleToggle(todo)}
                  style={{ marginLeft: "5px" }}
                >
                  {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;