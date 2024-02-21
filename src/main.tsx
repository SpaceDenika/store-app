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
import Register from './pages/Register/Register';
import RequireAuth from './helpers/RequireAuth';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Success from './components/Success/Success';

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
				path: '/success',
				element: <Success />
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
				path: 'register',
				element: <Register />
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
], {
	basename: import.meta.env.BASE_URL
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
