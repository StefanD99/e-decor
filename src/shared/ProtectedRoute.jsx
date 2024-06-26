import { useContext } from "react";
import AuthContext from "../context/authContext/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

    const {isAuthenticated} = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to={'/home'} />
    }

    return <Outlet />
};

export default ProtectedRoute;
