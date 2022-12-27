import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks';

function RequireAuth() {
    const isLoggedIn: boolean = useAppSelector((state) => state.user.username !== null)
    let location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return null;
}

export default RequireAuth