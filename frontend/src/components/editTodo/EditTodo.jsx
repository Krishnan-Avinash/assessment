import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditTodo = ({ addTodo, item }) => {
  const [todo, setTodo] = useState("");
  const [desc, setDesc] = useState("");

  const EditEntity = async (e) => {
    e.preventDefault();
    if (!todo || !desc) {
      toast.error("Field cannot be empty");
      return;
    }
    const newTodo = {
      name: todo,
      description: desc,
      createdAt: Date().slice(0, 25),
      updatedAt: "",
      completed: false,
    };
    addTodo(newTodo);
    setDesc("");
    setTodo("");
  };

  return (
    <div className="add-a-todo-container">
      <form className="add-a-todo-form">
        <input
          type="text"
          name="Todo"
          placeholder="Enter Task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <textarea
          type="text"
          name="Desc"
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          type="submit"
          className="add-a-todo-button"
          onClick={EditEntity}
        >
          Edit
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default EditTodo;
