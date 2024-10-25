import { useRef, useInsertionEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEvent<T extends (...args: any[]) => unknown>(
  callback: T
): T {
  const ref = useRef({
    stableFn: ((...args) => ref.current.callback(...args)) as T,
    callback,
  });

  // useLayoutEffect for React <18
  useInsertionEffect(() => {
    ref.current.callback = callback;
  });
  return ref.current.stableFn;
}
