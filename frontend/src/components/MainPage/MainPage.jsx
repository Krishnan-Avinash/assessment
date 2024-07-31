import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayTodo from "../DisplayTodo/DisplayTodo";
import AddATodo from "../AddATodo/AddATodo";

const MainPage = () => {
  const [filtered, setFiltered] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post("http://localhost:3000/data", newTodo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/data/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.patch(`http://localhost:3000/data/${id}`, {
        completed: !completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      await axios.patch(`http://localhost:3000/data/${id}`, updatedData);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedData } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const filteredFunction = (e) => {
    const temp = todos.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltered(temp);
    if (e.target.value.length == 0) {
      setFiltered([]);
    }
  };

  return (
    <div className="main-page-container">
      <h1 className="main-page-h1">Todo.....</h1>
      <main>
        <div className="main-left">
          <div className="main-left-up">Your Tasks</div>
          <div className="main-left-down">{Date().slice(0, 25)}</div>
        </div>
        <div className="main-right">
          <button
            className="new-task-button"
            onClick={() => setShowAdd(!showAdd)}
          >
            {showAdd ? <p>Cancel</p> : <p>+ New Task</p>}
          </button>
        </div>
      </main>
      {showAdd && <AddATodo addTodo={addTodo} />}
      <input
        className="search-bar"
        type="text"
        placeholder="Search for your TODO"
        onChange={(e) => filteredFunction(e)}
      />
      <ul>
        {filtered.map((item) => (
          <div className="individual-todo" key={item.id}>
            <div className="individual-todo-left">
              <h1
                className="todo-name"
                style={item.completed ? { textDecoration: "line-through" } : {}}
              >
                {item.name}
              </h1>
              <h1
                className="todo-description"
                style={item.completed ? { textDecoration: "line-through" } : {}}
              >
                {item.description}
              </h1>
              <h1 className="todo-createdAt">
                <span style={{ fontWeight: "700" }}>
                  Created At: &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                {item.createdAt}
              </h1>
              {item.updatedAt && (
                <h1 className="todo-updatedAt">
                  <span style={{ fontWeight: "700" }}>
                    Updated At: &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                  {item.updatedAt}
                </h1>
              )}
            </div>
            <div className="individual-todo-right">
              <input
                type="checkbox"
                style={{ cursor: "pointer" }}
                defaultChecked={item.completed}
                onChange={() => toggleComplete(item.id, item.completed)}
              />
              <div
                style={{ fontWeight: "700", color: "red" }}
                onClick={() => deleteTodo(item.id)}
              >
                X
              </div>
            </div>
          </div>
        ))}
      </ul>
      <DisplayTodo
        todos={todos}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default MainPage;
