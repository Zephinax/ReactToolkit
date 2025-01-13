import { useCallback } from 'react';

const useCopyToClipboard = () => {
  const copyToClipboard = useCallback(
    async (content: string | object | number) => {
      const textToCopy =
        typeof content === 'string' ? content : JSON.stringify(content);

      // Check if the Clipboard API is available
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          console.log('Copied to clipboard:', textToCopy);
        } catch (err) {
          console.error('Failed to copy using clipboard API:', err);
        }
      } else {
        // Fallback for browsers that do not support the Clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          console.log('Copied to clipboard (fallback):', textToCopy);
        } catch (err) {
          console.error('Failed to copy using execCommand:', err);
        }
        document.body.removeChild(textarea);
      }
    },
    []
  );

  return copyToClipboard;
};

export default useCopyToClipboard;
