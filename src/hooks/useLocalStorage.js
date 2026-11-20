import { useEffect } from "react";
export function useLocalStorage(key, value, enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Could not save data to localStorage:", error);
    }
  }, [key, value, enabled]);
}
