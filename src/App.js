import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [taskDate, setTaskDate] = useState("");

  // Load tasks from local storage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle adding a new task
  const addTask = () => {
    if (!taskText.trim() || !taskDate) return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      date: taskDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
    setTaskDate("");
  };

  // Handle editing an existing task
  const updateTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: taskText, date: taskDate } : task
    );
    setTasks(updatedTasks);
    setTaskText("");
    setTaskDate("");
    setEditTaskId(null);
  };

  // Handle marking a task as completed
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle deleting a task
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        {editTaskId ? (
          <button onClick={() => updateTask(editTaskId)}>Update Task</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
            <div className="task-info">
              <p>{task.text}</p>
              <p>Due: {task.date}</p>
            </div>
            <div className="task-actions">
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => {
                  setEditTaskId(task.id);
                  setTaskText(task.text);
                  setTaskDate(task.date);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
