import axios from 'axios';

const FAKE_STORE_API = 'https://fakestoreapi.com';

const fakeStoreApi = axios.create({
  baseURL: FAKE_STORE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = async () => {
  const { data } = await fakeStoreApi.get('/products');
  return data;
};

export const getProductById = async (id) => {
  const { data } = await fakeStoreApi.get(`/products/${id}`);
  return data;
};

export const getProductsByCategory = async (category) => {
  const { data } = await fakeStoreApi.get(`/products/category/${category}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await fakeStoreApi.get('/products/categories');
  return data;
};

// Auth API
export const login = async (username, password) => {
  const { data } = await fakeStoreApi.post('/auth/login', {
    username,
    password,
  });
  return data;
};

// Users API
export const getUsers = async () => {
  const { data } = await fakeStoreApi.get('/users');
  return data;
};

export const getUserById = async (id) => {
  const { data } = await fakeStoreApi.get(`/users/${id}`);
  return data;
};

// Carts API
export const getCarts = async (userId) => {
  const url = userId ? `/carts/user/${userId}` : '/carts';
  const { data } = await fakeStoreApi.get(url);
  return data;
};

export const getCartById = async (id) => {
  const { data } = await fakeStoreApi.get(`/carts/${id}`);
  return data;
};

export const createCart = async (cartData) => {
  const { data } = await fakeStoreApi.post('/carts', cartData);
  return data;
};

export const updateCart = async (id, cartData) => {
  const { data } = await fakeStoreApi.put(`/carts/${id}`, cartData);
  return data;
};

export const deleteCart = async (id) => {
  const { data } = await fakeStoreApi.delete(`/carts/${id}`);
  return data;
};

export default fakeStoreApi;

