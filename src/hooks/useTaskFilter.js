import { useMemo } from "react";

export function useTaskFilter(tasks, searchTerm, priority) {
  return useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch);

      const matchesPriority =
        priority === "all" || task.priority === priority;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchTerm, priority]);
}
