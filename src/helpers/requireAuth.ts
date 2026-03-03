import { ROUTE_PATHS } from '@/router/routes';
import { redirect } from 'react-router';

export const requireAuth = (): void => {
  const jwt = localStorage.getItem('token');

  if (!jwt) {
    throw redirect(ROUTE_PATHS.AUTH.LOGIN);
  }
};
