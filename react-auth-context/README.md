# Authentication Context and Private Route

This project provides a simple authentication context and a private route component for managing user authentication in a React application. It uses cookies and local storage to persist authentication state across sessions.

## Features

- **Auth Context**: Manages user authentication state and provides login and logout functionality.
- **Private Route**: Protects routes from unauthorized access, redirecting users if they are not authenticated.

## Required Packages

To use this project, ensure you have the following packages installed:

- `react`
- `react-dom`
- `react-router-dom`
- `js-cookie`

You can install them using npm:

```bash
npm install react react-dom react-router-dom js-cookie
```

## Step 1: Set Up the AuthProvider

Wrap your main application component with the AuthProvider to provide authentication context throughout your app.

```jsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import App from './App';

const Main = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default Main;
```

## Step 2: Create a Login Component

Create a login component that uses the useAuth hook to access the login function.

```jsx
import React from 'react';
import { useAuth } from './AuthContext';

const LoginComponent = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    const token = 'your-auth-token'; // Replace with actual token
    const rememberMe = true; // Set to true for 'remember me' functionality
    login(token, rememberMe);
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default LoginComponent;
```

## Step 3: Create a Logout Component

Create a logout component to handle user logout.

```jsx
import React from 'react';
import { useAuth } from './AuthContext';

const LogoutComponent = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
};

export default LogoutComponent;
```

## Step 4: Protect Routes with PrivateRoute

Use the PrivateRoute component to protect certain routes in your application.

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Dashboard from './Dashboard';

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
```

## Step 5(Optional): Handle Loading State in PrivateRoute

The PrivateRoute component includes a loading state while checking authentication. You can customize the loading message or spinner as needed.

# API

### AuthProvider

children: The components that need access to the authentication context.

### useAuth

Returns an object with the following properties:
isAuthenticated: A boolean indicating if the user is authenticated.
login(token: string, rememberMe: boolean): Logs in the user with the provided token and optional 'remember me' functionality.
logout(): Logs out the user.

### PrivateRoute

children: The protected components that require authentication.
redirectPath: The path to redirect to if the user is not authenticated (defaults to '/').
