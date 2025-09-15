import './App.css'
import ErrorBoundary from './components/errors/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { AuthProvider } from './context/authContext';


function App() {

  return (
    <>
      <ErrorBoundary>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App
