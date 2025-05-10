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

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (stop) return;

    const interval = setInterval(() => {
      if (retryCountRef.current < retries) {
        callbackRef.current();
        retryCountRef.current++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    // Immediate retry
    if (retryCountRef.current < retries) {
      callbackRef.current();
      retryCountRef.current++;
    }

    return () => clearInterval(interval);
  }, [delay, retries, stop]);

  return;
};

export default useRetry;
