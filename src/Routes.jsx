// Routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layouts/layout';
import Home from './pages/users/Home';
import Post from './pages/users/Post';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RouterErrorBoundary from './components/errors/RouteErrorBoundary';
import NotFoundPage from './components/errors/NotFoundPage';

const Placeholder = ({ label }) => (
  <div className="max-w-5xl mx-auto px-6 py-16">
    <h1 className="font-black uppercase tracking-tight">{label}</h1>
    <p className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)] mt-4">COMING SOON.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouterErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'post/:slug', element: <Post /> },
      { path: 'archive', element: <Placeholder label="ARCHIVE" /> },
      { path: 'manifesto', element: <Placeholder label="MANIFESTO" /> },
      { path: 'admin', element: <Placeholder label="ADMIN" /> },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },

  // Catch-all 404
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);


export default router;
