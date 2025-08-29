import './App.css'
import ErrorBoundary from './components/errors/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import router from '../Routes';


function App() {

  return (
    <>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </>
  );
}

export default App
