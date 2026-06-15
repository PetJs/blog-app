import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layouts/layout';
import Home from './pages/users/Home';
import Post from './pages/users/Post';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/admin/Dashboard';
import Editor from './pages/admin/Editor';
import RouterErrorBoundary from './components/errors/RouteErrorBoundary';
import NotFoundPage from './components/errors/NotFoundPage';
// import { useAuth } from './context/authContext'; // re-enable with AdminGuard when backend is ready

const Placeholder = ({ label }) => (
  <div className="max-w-5xl mx-auto px-6 py-16">
    <h1 className="font-black uppercase tracking-tight">{label}</h1>
    <p className="text-xs uppercase tracking-widest text-[var(--on-surface-variant)] mt-4">COMING SOON.</p>
  </div>
);

// Redirects to /login if not authenticated
const AdminGuard = () => {
  // TODO: re-enable auth check when backend login is ready
  // const { user } = useAuth();
  // if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const router = createBrowserRouter([
  // ── Public routes
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouterErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'post/:slug', element: <Post /> },
      { path: 'archive', element: <Placeholder label="ARCHIVE" /> },
      { path: 'manifesto', element: <Placeholder label="MANIFESTO" /> },
    ],
  },

  // ── Auth
  { path: 'login', element: <Login /> },
  { path: 'register', element: <Register /> },

  // ── Admin routes (protected)
  {
    path: 'admin',
    element: <AdminGuard />,
    children: [
      { index: true, element: <Navigate to="/admin/posts" replace /> },
      { path: 'posts', element: <Dashboard /> },
      { path: 'analytics', element: <Dashboard /> },
      { path: 'settings', element: <Dashboard /> },
      { path: 'editor/:slug', element: <Editor /> },
    ],
  },

  // ── 404
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
