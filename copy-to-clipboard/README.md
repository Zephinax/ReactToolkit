# \`useCopyToClipboard\` Hook

A custom React hook that allows you to copy text, objects, or numbers to the clipboard. It supports both the modern Clipboard API and a fallback method for older browsers.

## Features

- **Clipboard API Support**: Uses the modern Clipboard API for copying text.
- **Fallback Mechanism**: Falls back to the \`document.execCommand('copy')\` method for browsers that do not support the Clipboard API.
- **Flexible Input**: Accepts strings, objects, or numbers as input and handles conversion automatically.
- **Logging**: Logs success and error messages to the console for debugging purposes.

## Installation

To use this hook, simply import it into your React component:

\`\`\`javascript
import useCopyToClipboard from './useCopyToClipboard';
\`\`\`

## Usage

### Basic Usage

\`\`\`javascript
import React from 'react';
import useCopyToClipboard from './useCopyToClipboard';

const MyComponent = () => {
const copyToClipboard = useCopyToClipboard();

const handleCopy = () => {
copyToClipboard('Hello, World!');
};

return (

<div>
<button onClick={handleCopy}>Copy to Clipboard</button>
</div>
);
};

export default MyComponent;
\`\`\`

### Copying Objects or Numbers

The hook can also handle objects and numbers by converting them to a JSON string before copying:

\`\`\`javascript
const handleCopyObject = () => {
const myObject = { name: 'John', age: 30 };
copyToClipboard(myObject);
};

const handleCopyNumber = () => {
const myNumber = 42;
copyToClipboard(myNumber);
};
\`\`\`

## API

### \`useCopyToClipboard()\`

Returns a function that can be used to copy content to the clipboard.

#### Parameters

- **content** (\`string | object | number\`): The content to be copied to the clipboard. If the content is not a string, it will be converted to a JSON string.

#### Returns

- **copyToClipboard** (\`function\`): A function that takes the content as an argument and attempts to copy it to the clipboard.

## Example

\`\`\`javascript
import React from 'react';
import useCopyToClipboard from './useCopyToClipboard';

const App = () => {
const copyToClipboard = useCopyToClipboard();

const handleCopyText = () => {
copyToClipboard('This is a sample text.');
};

const handleCopyObject = () => {
copyToClipboard({ key: 'value', number: 123 });
};

return (

<div>
<button onClick={handleCopyText}>Copy Text</button>
<button onClick={handleCopyObject}>Copy Object</button>
</div>
);
};

export default App;
\`\`\`

## Browser Compatibility

- **Modern Browsers**: Supports the Clipboard API (e.g., Chrome, Firefox, Edge).
- **Older Browsers**: Falls back to \`document.execCommand('copy')\` for compatibility with older browsers (e.g., Internet Explorer).

## License

This project is open-source and available under the MIT License.

---

Feel free to contribute or report issues if you find any!
