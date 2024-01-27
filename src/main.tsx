import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import Main from './layout/Main/Main';
import Error from './pages/Error/Error';
import Cart from './pages/Cart/Cart';
import Catalog from './pages/Catalog/Catalog';
import Product from './pages/Product/Product';
import Auth from './layout/Auth/Auth';
import Login from './pages/Login/Login';
import Registr from './pages/Registr/Registr';
import RequireAuth from './helpers/RequireAuth';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Main /></RequireAuth>,
		children: [
			{
				path: '/',
				element: <Catalog />
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/product/:id',
				element: <Product />
			}
		]
	},
	{
		path: '/auth',
		element: <Auth />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'registr',
				element: <Registr />
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
