import './App.css'
import ErrorBoundary from './components/errors/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { AuthProvider } from './context/authContext';
import { PostsProvider } from './context/postContext';


function App() {

  return (
    <>
      <ErrorBoundary>
        <AuthProvider>
          <PostsProvider>
            <RouterProvider router={router} />
          </PostsProvider>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App
