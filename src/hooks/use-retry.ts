import { useEffect, useRef } from 'react';

const useRetry = ({
  callback,
  retries = Infinity,
  delay = 1000,
  stop = false,
}: {
  callback: () => void;
  retries?: number;
  delay?: number;
  stop?: boolean;
}) => {
  const retryCountRef = useRef(0);
  const callbackRef = useRef(callback);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (stop) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      if (retryCountRef.current < retries) {
        callbackRef.current();
        retryCountRef.current++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, delay);

    // Immediate retry
    if (retryCountRef.current < retries) {
      callbackRef.current();
      retryCountRef.current++;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [delay, retries, stop]);

  return;
};

export default useRetry;
