import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useUserRole from '../../hooks/useUserRole';
import PageLoading from '../../components/PageLoading';


const RoleRedirect = () => {
    const { role, roleLoading } = useUserRole();
    const navigate = useNavigate();

    console.log('RoleRedirect component rendered with role:', role);
    useEffect(() => {
        if (!roleLoading) {
            if (role === 'admin') navigate('/dashboard/admin-home', { replace: true });
            else if (role === 'seller') navigate('/dashboard/seller-home', { replace: true });
            else if (role === 'user') navigate('/dashboard/user-payments', { replace: true });
            else navigate('/forbidden', { replace: true }); // or wherever you want
        }
    }, [role, roleLoading, navigate]);

    if (roleLoading) return <PageLoading text="Loading Dashboard..." fullScreen={true} />;
    return <PageLoading text="Redirecting..." fullScreen={true} />;
};

export default RoleRedirect;
