import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("saves a value when enabled", async () => {
    const tasks = [{ id: "1", title: "Test task" }];

    renderHook(() => useLocalStorage("test-tasks", tasks, true));

    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem("test-tasks"))).toEqual(tasks);
    });
  });

  it("does not save a value when disabled", () => {
    renderHook(() => useLocalStorage("test-tasks", [], false));

    expect(window.localStorage.getItem("test-tasks")).toBeNull();
  });

  it("updates storage when the value changes", async () => {
    const { rerender } = renderHook(
      ({ value }) => useLocalStorage("test-tasks", value, true),
      { initialProps: { value: [{ id: "1" }] } }
    );

    rerender({ value: [{ id: "1" }, { id: "2" }] });

    await waitFor(() => {
      expect(JSON.parse(window.localStorage.getItem("test-tasks"))).toHaveLength(2);
    });
  });
});
