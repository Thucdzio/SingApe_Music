import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timeout to update debouncedValue after `delay` ms
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: if `value` or `delay` changes before timeout, clear it
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
