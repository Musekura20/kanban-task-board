import { Link } from "react-router-dom";

function TaskCard({ task, onMove, onDelete }) {
  const previousStatus = {
    "in-progress": "todo",
    done: "in-progress"
  };

  const nextStatus = {
    todo: "in-progress",
    "in-progress": "done"
  };

  return (
    <article className="task-card">
      <div className="task-card-top">
        <span className={`priority priority-${task.priority}`}>
          {task.priority} priority
        </span>
        <Link
          className="task-edit-link"
          to={`/task/${task.id}`}
          aria-label={`Edit ${task.title}`}
        >
          Edit
        </Link>
      </div>

      <Link className="task-card-content" to={`/task/${task.id}`}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </Link>

      <div className="task-card-actions">
        {previousStatus[task.status] && (
          <button
            className="button button-small button-secondary"
            type="button"
            onClick={() => onMove(task.id, previousStatus[task.status])}
          >
            Move back
          </button>
        )}

        {nextStatus[task.status] && (
          <button
            className="button button-small button-secondary"
            type="button"
            onClick={() => onMove(task.id, nextStatus[task.status])}
          >
            Move forward
          </button>
        )}

        <button
          className="button button-small button-danger"
          type="button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
