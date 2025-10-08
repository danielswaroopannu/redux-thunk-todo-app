import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, setSearch, setPage } from "./redux/todoSlice";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Pagination from "./components/Pagination";

const App = () => {
  const dispatch = useDispatch();
  const { todos, loading, error, searchTerm, currentPage } = useSelector(
    (state) => state.todos
  );

  const todosPerPage = 10;

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = todos.filter((todo) =>
    todo?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * todosPerPage;
  const indexOfFirst = indexOfLast - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirst, indexOfLast);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Todo App with Redux Thunk</h2>

      <TodoForm />

      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <TodoList todos={currentTodos} />
          <Pagination
            totalItems={filteredTodos.length}
            itemsPerPage={todosPerPage}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default App;