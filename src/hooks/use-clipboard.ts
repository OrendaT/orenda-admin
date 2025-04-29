import { useState } from 'react';

const useClipboard = (text: string): [boolean, () => void] => {
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    if (!copied) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };
  return [copied, onClick];
};
export { useClipboard };
