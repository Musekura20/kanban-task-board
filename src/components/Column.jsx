import TaskCard from "./TaskCard";

function Column({ title, status, tasks, onMoveTask, onDeleteTask }) {
  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <section className="kanban-column" aria-label={`${title} column`}>
      <div className="column-heading">
        <div>
          <h2>{title}</h2>
          <span className="task-count">{columnTasks.length} tasks</span>
        </div>
      </div>

      <div className="column-task-list">
        {columnTasks.length === 0 ? (
          <p className="empty-message">No tasks here yet.</p>
        ) : (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMoveTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Column;
