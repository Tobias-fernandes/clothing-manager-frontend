import { useEffect, useState } from "react";

function useDebouce<T>(value: T, delay: number = 400): T {
  const [debouced, setDebouced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouced;
}

export { useDebouce };
