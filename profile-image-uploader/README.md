# \`ProfileSelectorInput\` Component

The \`ProfileSelectorInput\` component is a reusable React component designed for uploading, displaying, and managing profile or general images. It supports image uploads, deletions, and displays a progress ring during upload. It is highly customizable and works seamlessly with APIs for handling image uploads and deletions.

## Features

- **Image Upload**: Allows users to upload images via file input.
- **Image Deletion**: Provides an option to delete the uploaded image.
- **Progress Ring**: Displays a circular progress indicator during image upload.
- **Customizable URLs**: Supports custom API endpoints for upload and delete operations.
- **Error Handling**: Handles image loading errors gracefully.
- **Responsive Design**: Works well across different screen sizes.

## Required Packages

To use this component, ensure you have the following packages installed:

- \`react\`
- \`react-icons\` (for edit and delete icons)
- \`axios\` (for API requests)

You can install them using npm:

\`\`\`bash
npm install react react-icons axios
\`\`\`

## Props

The \`ProfileSelectorInput\` component accepts the following props:

| Prop Name           | Type                      | Description                                                          | Default Value                                                      |
| ------------------- | ------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------- |
| \`deleteUrl\`       | \`string\`                | API endpoint for deleting the image.                                 | \`POST_DELETE_AVATAR\`                                             |
| \`uploadUrl\`       | \`string\`                | API endpoint for uploading the image.                                | \`POST_UPLOAD_AVATAR\`                                             |
| \`profileImageUrl\` | \`string\`                | URL of the existing profile image to display.                        | \`null\`                                                           |
| \`type\`            | \`"profile"               | "general"\`                                                          | Determines the shape of the image container (circle or rectangle). | \`"profile"\` |
| \`onChangeImage\`   | \`(url: string) => void\` | Callback function triggered when the image is successfully uploaded. | \`undefined\`                                                      |

## Usage

### Basic Usage

\`\`\`jsx
import React from 'react';
import ProfileSelectorInput from './ProfileSelectorInput';

const App = () => {
const handleImageChange = (imageUrl) => {
console.log('New image URL:', imageUrl);
};

return (
<div>
<ProfileSelectorInput
        profileImageUrl="https://example.com/profile.jpg"
        onChangeImage={handleImageChange}
      />
</div>
);
};

export default App;
\`\`\`

### Custom API Endpoints

You can customize the API endpoints for upload and delete operations:

\`\`\`jsx
<ProfileSelectorInput
  deleteUrl="/custom/delete-endpoint"
  uploadUrl="/custom/upload-endpoint"
  profileImageUrl="https://example.com/profile.jpg"
  onChangeImage={handleImageChange}
/>
\`\`\`

### Handling Different Image Types

Use the \`type\` prop to switch between profile (circular) and general (rectangular) image containers:

\`\`\`jsx
<ProfileSelectorInput
  type="general"
  profileImageUrl="https://example.com/image.jpg"
  onChangeImage={handleImageChange}
/>
\`\`\`

## Styling

The component uses Tailwind CSS for styling. You can customize the styles by overriding the classes or using your preferred CSS framework.

## Example

\`\`\`jsx
import React from 'react';
import ProfileSelectorInput from './ProfileSelectorInput';

const App = () => {
const handleImageChange = (imageUrl) => {
console.log('New image URL:', imageUrl);
};

return (
<div className="p-4">
<h1>Profile Selector Example</h1>
<ProfileSelectorInput
        profileImageUrl="https://example.com/profile.jpg"
        onChangeImage={handleImageChange}
      />
</div>
);
};

export default App;
\`\`\`

## API Integration

The component uses \`axios\` to make API requests. Ensure your backend supports the following:

1. **Upload Endpoint**: Accepts a \`multipart/form-data\` request with the image file.
2. **Delete Endpoint**: Accepts a request to delete the image (typically a POST request with the image URL).

## License

This project is open-source and available under the MIT License.

---

Feel free to contribute or report issues if you find any!
