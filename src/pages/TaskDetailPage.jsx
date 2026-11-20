import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskDetailPage({ tasks, onUpdateTask, onDeleteTask, onArchiveTask }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((item) => item.id === id);

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [status, setStatus] = useState(task?.status ?? "todo");
  const [priority, setPriority] = useState(task?.priority ?? "medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    }
  }, [task]);

  if (!task) {
    return (
      <main className="page-container">
        <div className="not-found-panel">
          <h1>Task not found</h1>
          <p>This task may have been deleted or the link may be incorrect.</p>
          <Link className="button button-primary" to="/">
            Back to board
          </Link>
        </div>
      </main>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateTask(id, {
      title: title.trim(),
      description: description.trim(),
      status,
      priority
    });

    navigate("/");
  }

  function handleDelete() {
    onDeleteTask(id);
    navigate("/");
  }

  function handleArchive() {
    onArchiveTask(id, !task.archived);
    navigate(task.archived ? "/" : "/archive");
  }

  return (
    <main className="page-container narrow-container">
      <Link className="back-link" to="/">
        ← Back to board
      </Link>

      <section className="detail-panel">
        <p className="eyebrow">TASK DETAILS</p>
        <h1>Edit task</h1>

        <form className="detail-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>

          <label>
            Description
            <textarea
              rows="5"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>

          <label>
            Status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>

          <label>
            Priority
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>

          <div className="detail-actions">
            <button className="button button-primary" type="submit">
              Save changes
            </button>

            <button
              className="button button-secondary"
              type="button"
              onClick={handleArchive}
            >
              {task.archived ? "Restore from archive" : "Archive task"}
            </button>

            <button
              className="button button-danger"
              type="button"
              onClick={handleDelete}
            >
              Delete task
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default TaskDetailPage;
