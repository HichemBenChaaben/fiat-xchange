import { useState } from 'react';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import Toaster from '../atoms/Toaster';

const CopyToClipboardButton = ({ text, className, canCopy }) => {
  if (!canCopy) {
    return null;
  }
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const [showToaster, setShowToaster] = useState(false);
  const handleClick = (text) => {
    if (!isCopied) {
      setShowToaster(true);
      setTimeout(() => {
        setShowToaster(false);
      }, 2000);
      copyToClipboard(text);
    }
  };
  return (
    <>
      {showToaster && <Toaster message="copied to clipboard" />}
      {!isCopied && (
        <button
          type="button"
          className={className}
          onClick={() => handleClick(text)}
        >
          &nbsp;
        </button>
      )}
    </>
  );
};

export default CopyToClipboardButton;
