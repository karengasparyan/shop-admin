import axios from 'axios';
import {serialize} from 'object-to-formdata';
import Account from './helpers/Account';

const {REACT_APP_API_URL} = process.env;
const api = axios.create({
  baseURL: REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  if (!config.headers.authorization) {
    config.headers.authorization = Account.getToken();
  }
  return config;
}, (e) => Promise.reject(e));

api.interceptors.response.use((r) => r, (e) => {
  if (e.response.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/admin/sign-in';
  }
  return Promise.reject(e);
});

class Api {

  static signIn(userName, password) {
    return api.post('/admin/sign-in', {userName, password});
  }

  static getProducts(query) {
    return api.get('/products', {
      params: query ,
    });
  }

  static singleProduct(productId) {
    return api.post('/products/single-product', {productId});
  }

  static deleteProducts(productsId) {
    return api.post('/products/delete-product', {productsId});
  }

  static getAttributes() {
    return api.get('/products/attributes-list')
  }

  static uploadImageProduct(file, images, productId) {
    return api.post('/products/upload-image', serialize({file, productId, images}));
  }

  static uploadImageSlider(file, images, imageTitle, imageDescription, catalogLink) {
    return api.post('/products/upload-sidebar-image', serialize({file, images, imageTitle, imageDescription, catalogLink}));
  }

  static getImageSlider() {
    return api.get('/products/slider-images-list');
  }

  static createProduct(data) {
    return api.post('products/create-product', data);
  }

  static updateProduct(data) {
    return api.post('products/update-product', data);
  }

  static getSidebarTitles() {
    return api.get('filter/get-sidebar-titles');
  }

  static createUpdateSidebarTitle(titles) {

    return api.post('filter/create-update-sidebar-title', {titles});
  }

  static orderList(page) {
    return api.get('/cart/order-list', {
      params: { page },
    });
  }

  static updateOrderStatus(id) {
    return api.post('cart/update-order-status', {id});
  }

}

export default Api;
