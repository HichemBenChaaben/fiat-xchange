import { useEffect } from 'react';

const useEscapeKey = (callback: () => void): void => {
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [callback]);
};

export default useEscapeKey;
