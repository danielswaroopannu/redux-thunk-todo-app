import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunks
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) throw new Error("Failed to fetch todos");
  return await response.json();
});

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (title) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false, userId: 1 }),
  });
  if (!response.ok) throw new Error("Failed to add todo");
  const data = await response.json();
  return { ...data, id: Date.now(), completed: false };
});

export const deleteTodoAsync = createAsyncThunk("todos/deleteTodoAsync", async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete todo");
  return id;
});

export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodoAsync",
  async ({ id, title, completed }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed }),
    });
    if (!response.ok) throw new Error("Failed to update todo");
    return { id, title, completed };
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
    searchTerm: "",
    currentPage: 1,
  },
  reducers: {
    setSearch: (state, action) => {
      state.searchTerm = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const { id, ...rest } = action.payload;
        state.todos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, ...rest } : todo
        );
      });
  },
});

export const { setSearch, setPage } = todoSlice.actions;
export default todoSlice.reducer;