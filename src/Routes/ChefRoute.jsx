import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useChef from "../hooks/useChef";

const ChefRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isChef, isChefLoading] = useChef();
    const location = useLocation();

    if (loading || isChefLoading) {
        return <progress className="progress w-56"></progress>

    }

    if (user && isChef) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace ></Navigate>
};

export default ChefRoute;