import { useState } from "react";
import { Link } from "react-router-dom";
import Column from "../components/Column";
import FilterBar from "../components/FilterBar";
import { useTaskFilter } from "../hooks/useTaskFilter";

function BoardPage({
  tasks,
  onAddTask,
  onMoveTask,
  onDeleteTask,
  isLoading
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priority, setPriority] = useState("all");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriority, setNewPriority] = useState("medium");

  const visibleTasks = useTaskFilter(tasks, searchTerm, priority);

  function handleAddTask(event) {
    event.preventDefault();

    if (!newTitle.trim()) {
      return;
    }

    onAddTask({
      title: newTitle.trim(),
      description: newDescription.trim(),
      priority: newPriority
    });

    setNewTitle("");
    setNewDescription("");
    setNewPriority("medium");
  }

  if (isLoading) {
    return (
      <main className="page-container">
        <div className="loading-panel" role="status">
          <span className="loading-spinner" />
          <p>Preparing your task board...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <header className="page-header">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1>My task board</h1>
          <p className="page-subtitle">
            Organize your work, keep track of progress, and get things done.
          </p>
        </div>

        <Link className="button button-secondary" to="/archive">
          View archive
        </Link>
      </header>

      <form className="add-task-form" onSubmit={handleAddTask}>
        <div className="form-heading">
          <h2>Add a new task</h2>
          <p>Create a task and decide how important it is.</p>
        </div>

        <div className="add-task-fields">
          <label>
            Task title
            <input
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="e.g. Finish project documentation"
              required
            />
          </label>

          <label>
            Description
            <input
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
              placeholder="Add a short description"
            />
          </label>

          <label>
            Priority
            <select
              value={newPriority}
              onChange={(event) => setNewPriority(event.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>

          <button className="button button-primary" type="submit">
            Add task
          </button>
        </div>
      </form>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        priority={priority}
        onPriorityChange={setPriority}
      />

      <div className="board-summary">
        <p>
          Showing <strong>{visibleTasks.length}</strong> of{" "}
          <strong>{tasks.length}</strong> active tasks
        </p>
      </div>

      <div className="kanban-board">
        <Column
          title="To Do"
          status="todo"
          tasks={visibleTasks}
          onMoveTask={onMoveTask}
          onDeleteTask={onDeleteTask}
        />

        <Column
          title="In Progress"
          status="in-progress"
          tasks={visibleTasks}
          onMoveTask={onMoveTask}
          onDeleteTask={onDeleteTask}
        />

        <Column
          title="Done"
          status="done"
          tasks={visibleTasks}
          onMoveTask={onMoveTask}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </main>
  );
}

export default BoardPage;
