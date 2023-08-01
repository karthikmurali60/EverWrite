import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie';

const PrivateRoutes = () => {
    function isLoggedIn() {
        if (Cookies.get('username') !== undefined) {
            return true;
        }
    
        return false;
    }

    return (
        isLoggedIn() ? <Outlet/> : <Navigate to='/'/>
    )
}

export default PrivateRoutes;
