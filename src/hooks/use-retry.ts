import { useEffect, useRef } from 'react';

const useRetry = ({
  func,
  retries = Infinity,
  delay = 1000,
  stop = false,
}: {
  func: () => void;
  retries?: number;
  delay?: number;
  stop?: boolean;
}) => {
  const retryCountRef = useRef(0);
  const funcRef = useRef(func);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  // Keep func ref updated
  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  useEffect(() => {
    if (stop) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      if (retryCountRef.current < retries) {
        funcRef.current();
        retryCountRef.current++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, delay);

    // Immediate retry
    if (retryCountRef.current < retries) {
      funcRef.current();
      retryCountRef.current++;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [delay, retries, stop]);

  return;
};

export default useRetry;
