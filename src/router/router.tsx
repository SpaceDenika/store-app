import { requireAuth } from '@/helpers/requireAuth';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
import { ROUTE_PATHS } from './routes';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';

export const router = createBrowserRouter(
  [
    {
      errorElement: <ErrorPage />,
      children: [
        {
          Component: MainLayout,
          middleware: [requireAuth],
          children: [
            {
              index: true,
              lazy: async () => {
                const module = await import('@/pages/Catalog/Catalog');
                return { Component: module.default };
              },
            },
            {
              path: ROUTE_PATHS.CART,
              lazy: async () => {
                const module = await import('@/pages/Cart/Cart');
                return { Component: module.default };
              },
            },
            {
              path: ROUTE_PATHS.SUCCESS,
              lazy: async () => {
                const module = await import('@/components/Success/Success');
                return { Component: module.default };
              },
            },
            {
              path: ROUTE_PATHS.PRODUCT,
              lazy: async () => {
                const module = await import('@/pages/Product/Product');
                return { Component: module.default };
              },
            },
          ],
        },
        {
          Component: AuthLayout,
          children: [
            {
              path: ROUTE_PATHS.AUTH.LOGIN,
              lazy: async () => {
                const module = await import('@/pages/LoginPage/LoginPage');
                return { Component: module.default };
              },
            },
            {
              path: ROUTE_PATHS.AUTH.REGISTER,
              lazy: async () => {
                const module = await import('@/pages/Register/Register');
                return { Component: module.default };
              },
            },
          ],
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
