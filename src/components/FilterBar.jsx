function FilterBar({
  searchTerm,
  onSearchChange,
  priority,
  onPriorityChange
}) {
  return (
    <section className="filter-bar" aria-label="Task filters">
      <label className="search-field">
        <span>Search tasks</span>
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or description..."
        />
      </label>

      <label className="priority-field">
        <span>Priority</span>
        <select
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="all">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>
    </section>
  );
}

export default FilterBar;
