import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';

const PriveteRoutes = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();
    console.log(location);
    

if (loading) {
    return <LoadingSpinner></LoadingSpinner>
    
}
if (user) {
    return children;
    
}



    return <Navigate state={location?.pathname} to='/login'></Navigate>
};

export default PriveteRoutes;