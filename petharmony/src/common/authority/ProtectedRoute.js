import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { role, isLogin } = useAuthStore();

    if (!isLogin) {
        return <Navigate to="/authority" />;
    }
    
    if (role !== requiredRole) {
        return <Navigate to="/authority" />;
    }

    return children;
};

export default ProtectedRoute;