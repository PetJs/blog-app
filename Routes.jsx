// Routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from './src/components/Layouts/layout';
import Dashboard from './src/pages/Dashboard';
import RouterErrorBoundary from './src/components/errors/RouteErrorBoundary';
import NotFoundPage from './src/components/errors/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // General layout
    errorElement: <RouterErrorBoundary />,
    children: [
      { path: '/', element: <Dashboard /> },
    ],
  },

  // Catch-all 404
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);


export default router;
