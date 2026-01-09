import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function ProtectedRoute() {
    const { auth, loading } = useAuth();

    if (loading) return null;

    if (!auth || !auth.token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
