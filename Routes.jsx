// Routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layouts/layout';
import Dashboard from './src/pages/Dashboard';

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
