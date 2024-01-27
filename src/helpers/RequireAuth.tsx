import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IRequireAuth {
  children: ReactNode;
}

function RequireAuth({ children }: IRequireAuth) {
	const jwt = localStorage.getItem('token');

	if (!jwt) {
		return <Navigate to={'/auth/login'} replace />;
	}

	return children;
}

export default RequireAuth;