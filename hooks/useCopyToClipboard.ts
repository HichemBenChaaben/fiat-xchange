import { useState, useEffect } from 'react';

const useCopyToClipboard = (): [boolean, (text: string) => void] => {
  const [isCopied, setIsCopied] = useState(false);
  const [textToCopy, setTextToCopy] = useState('');

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const reset = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => {
        clearTimeout(reset);
      };
    }
  }, [isCopied, textToCopy]);

  const handleCopyToClipboard = (text: string): void => {
    copyToClipboard(text);
    setTextToCopy(text);
  };

  return [isCopied, handleCopyToClipboard];
};

export default useCopyToClipboard;
