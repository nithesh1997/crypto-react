import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
const PrivateRoute = () => {
    const auth = localStorage.getItem('authenticated');
    return auth === true ? <Outlet /> : <Navigate to="/login" />;
}


export default PrivateRoute;