import React, { useState } from "react";

const DisplayTodo = ({ todos, deleteTodo, toggleComplete, updateTodo }) => {
  const [filter, setFilter] = useState("All");
  const [editTodo, setEditTodo] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Open" && !todo.completed) return true;
    if (filter === "Close" && todo.completed) return true;
    return false;
  });

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setNewName(todo.name);
    setNewDescription(todo.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!newName || !newDescription) {
      alert("Name and Description cannot be empty");
      return;
    }
    await updateTodo(editTodo.id, {
      name: newName,
      description: newDescription,
      updatedAt: Date().slice(0, 25),
    });
    setEditTodo(null);
  };

  return (
    <div className="display-todo-container">
      <div className="filters">
        <div className="filters-left">Select Filter:</div>
        <div className="filters-right">
          <div
            className="all-filter"
            onClick={() => setFilter("All")}
            style={
              filter === "All"
                ? { color: "blue", textDecoration: "underline" }
                : { color: "black", textDecoration: "none" }
            }
          >
            All
          </div>
          <div
            className="open-filter"
            onClick={() => setFilter("Open")}
            style={
              filter === "Open"
                ? { color: "blue", textDecoration: "underline" }
                : { color: "black", textDecoration: "none" }
            }
          >
            Open
          </div>
          <div
            className="close-filter"
            onClick={() => setFilter("Close")}
            style={
              filter === "Close"
                ? { color: "blue", textDecoration: "underline" }
                : { color: "black", textDecoration: "none" }
            }
          >
            Close
          </div>
        </div>
      </div>
      <div className="display-data">
        {filteredTodos.map((item) => (
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
            <input
              type="checkbox"
              style={{ cursor: "pointer" }}
              checked={item.completed}
              onChange={() => toggleComplete(item.id, item.completed)}
            />
            <div
              style={{ fontWeight: "700", color: "red", alignSelf: "center" }}
              onClick={() => deleteTodo(item.id)}
            >
              X
            </div>
            <button className="edit-btn" onClick={() => handleEdit(item)}>
              Edit
            </button>
          </div>
        ))}
      </div>

      {editTodo && (
        <div className="edit-container">
          <h2>Edit Todo</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New Task Name"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="New Description"
            />
            <div className="confirm">
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditTodo(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DisplayTodo;
