import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTaskFilter } from "./useTaskFilter";

const tasks = [
  {
    id: "1",
    title: "Study React",
    description: "Practise components",
    priority: "high"
  },
  {
    id: "2",
    title: "Read Java notes",
    description: "Revise classes",
    priority: "medium"
  },
  {
    id: "3",
    title: "Practise CSS",
    description: "Review layouts",
    priority: "low"
  }
];

describe("useTaskFilter", () => {
  it("returns all tasks when search and priority filters are empty", () => {
    const { result } = renderHook(() =>
      useTaskFilter(tasks, "", "all")
    );

    expect(result.current).toHaveLength(3);
  });

  it("searches task titles without case sensitivity", () => {
    const { result } = renderHook(() =>
      useTaskFilter(tasks, "REACT", "all")
    );

    expect(result.current.map((task) => task.id)).toEqual(["1"]);
  });

  it("searches task descriptions", () => {
    const { result } = renderHook(() =>
      useTaskFilter(tasks, "classes", "all")
    );

    expect(result.current.map((task) => task.id)).toEqual(["2"]);
  });

  it("filters by priority", () => {
    const { result } = renderHook(() =>
      useTaskFilter(tasks, "", "low")
    );

    expect(result.current.map((task) => task.id)).toEqual(["3"]);
  });

  it("combines search and priority filters", () => {
    const { result } = renderHook(() =>
      useTaskFilter(tasks, "study", "high")
    );

    expect(result.current.map((task) => task.id)).toEqual(["1"]);
  });
});
