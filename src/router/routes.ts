export const ROUTE_PATHS = {
  CATALOG: '/',
  CART: '/cart',
  SUCCESS: '/success',
  PRODUCT: '/product/:id',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  ERROR: '*',
} as const;

export const getProductPath = (id: number): string => {
  return ROUTE_PATHS.PRODUCT.replace(':id', String(id));
};
