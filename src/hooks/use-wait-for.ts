'use client';

import { useState } from 'react';

/**
 * @hook useWaitfor
 * @author vehktaur
 * @description performs a function then gives a delay before proceeding with the next code
 *
 */
const useWaitFor = () => {
  const [isPending, setIsPending] = useState(false);

  const waitFor = async <T>(func: () => T, delay: number = 500): Promise<T> => {
    setIsPending(true);
    const result = func();
    try {
      return await new Promise<T>((resolve, reject) => {
        setTimeout(() => {
          try {
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, delay);
      });
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, waitFor };
};

export default useWaitFor;
