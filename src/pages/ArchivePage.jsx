import { Link } from "react-router-dom";

function ArchivePage({ tasks, onArchiveTask }) {
  const archivedTasks = tasks.filter(
    (task) => task.archived || task.status === "done"
  );

  return (
    <main className="page-container">
      <header className="page-header">
        <div>
          <p className="eyebrow">COMPLETED WORK</p>
          <h1>Task archive</h1>
          <p className="page-subtitle">
            Completed tasks and tasks you have archived appear here.
          </p>
        </div>

        <Link className="button button-secondary" to="/">
          Back to board
        </Link>
      </header>

      {archivedTasks.length === 0 ? (
        <div className="empty-archive">
          <h2>Your archive is empty</h2>
          <p>Completed or archived tasks will appear here.</p>
        </div>
      ) : (
        <div className="archive-list">
          {archivedTasks.map((task) => (
            <article className="archive-card" key={task.id}>
              <div>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <span className={`priority priority-${task.priority}`}>
                  {task.priority} priority
                </span>
                <span className="archive-status">
                  {task.archived ? "Archived" : "Completed"}
                </span>
              </div>

              <div className="archive-actions">
                <Link
                  className="button button-small button-secondary"
                  to={`/task/${task.id}`}
                >
                  View / edit
                </Link>

                {task.archived && (
                  <button
                    className="button button-small button-primary"
                    type="button"
                    onClick={() => onArchiveTask(task.id, false)}
                  >
                    Restore
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default ArchivePage;
