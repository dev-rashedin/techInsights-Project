import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLoadUser from "../hooks/useLoadUser";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";


const AdminRoute = ({children}) => {
    const { user, loading } = useAuth(); 
    const [userData, , isLoading] = useLoadUser();

    const location = useLocation();

    if(loading || isLoading){
        return <LoadingSpinner/>
    }

    if (user && userData.role === 'admin') {
        return children;
    }

    toast.warn('Please login as an admin')
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default AdminRoute;