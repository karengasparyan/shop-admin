export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';

export function getProductsRequest(query) {
  return {
    type: GET_PRODUCTS_REQUEST,
    payload: { query },
  };
}

export const SINGLE_PRODUCTS_REQUEST = 'SINGLE_PRODUCTS_REQUEST';
export const SINGLE_PRODUCTS_SUCCESS = 'SINGLE_PRODUCTS_SUCCESS';
export const SINGLE_PRODUCTS_FAIL = 'SINGLE_PRODUCTS_FAIL';

export function singleProductsRequest(productId) {
  return {
    type: SINGLE_PRODUCTS_REQUEST,
    payload: { productId },
  };
}

export const CREATE_PRODUCTS_REQUEST = 'CREATE_PRODUCTS_REQUEST';
export const CREATE_PRODUCTS_SUCCESS = 'CREATE_PRODUCTS_SUCCESS';
export const CREATE_PRODUCTS_FAIL = 'CREATE_PRODUCTS_FAIL';

export function createProductsRequest(requestData, cb) {
  return {
    type: CREATE_PRODUCTS_REQUEST,
    payload: { requestData, cb },
  };
}

export const UPDATE_PRODUCTS_REQUEST = 'UPDATE_PRODUCTS_REQUEST';
export const UPDATE_PRODUCTS_SUCCESS = 'UPDATE_PRODUCTS_SUCCESS';
export const UPDATE_PRODUCTS_FAIL = 'UPDATE_PRODUCTS_FAIL';

export function updateProductsRequest(requestData, cb) {
  return {
    type: UPDATE_PRODUCTS_REQUEST,
    payload: { requestData, cb },
  };
}

export const DELETE_PRODUCTS_REQUEST = 'DELETE_PRODUCTS_REQUEST';
export const DELETE_PRODUCTS_SUCCESS = 'DELETE_PRODUCTS_SUCCESS';
export const DELETE_PRODUCTS_FAIL = 'DELETE_PRODUCTS_FAIL';

export function deleteProductsRequest(productsId, products) {
  return {
    type: DELETE_PRODUCTS_REQUEST,
    payload: { productsId },
  };
}

export const GET_ATTRIBUTES_REQUEST = 'GET_ATTRIBUTES_REQUEST';
export const GET_ATTRIBUTES_SUCCESS = 'GET_ATTRIBUTES_SUCCESS';
export const GET_ATTRIBUTES_FAIL = 'GET_ATTRIBUTES_FAIL';

export function getAttributesRequest() {
  return {
    type: GET_ATTRIBUTES_REQUEST,
    payload: {},
  };
}

export const UPLOAD_IMAGE_PRODUCTS_REQUEST = 'UPLOAD_IMAGE_PRODUCTS_REQUEST';
export const UPLOAD_IMAGE_PRODUCTS_SUCCESS = 'UPLOAD_IMAGE_PRODUCTS_SUCCESS';
export const UPLOAD_IMAGE_PRODUCTS_FAIL = 'UPLOAD_IMAGE_PRODUCTS_FAIL';

export function uploadImagesProductsRequest(files, images, productId) {
  return {
    type: UPLOAD_IMAGE_PRODUCTS_REQUEST,
    payload: { files, images, productId },
  };
}

export const UPLOAD_IMAGE_SLIDER_REQUEST = 'UPLOAD_IMAGE_SLIDER_REQUEST';
export const UPLOAD_IMAGE_SLIDER_SUCCESS = 'UPLOAD_IMAGE_SLIDER_SUCCESS';
export const UPLOAD_IMAGE_SLIDER_FAIL = 'UPLOAD_IMAGE_SLIDER_FAIL';

export function uploadImagesSliderRequest(files, images, imageTitle, imageDescription, catalogLink) {
  return {
    type: UPLOAD_IMAGE_SLIDER_REQUEST,
    payload: { files, images, imageTitle, imageDescription, catalogLink }
  };
}

export const GET_IMAGE_SLIDER_REQUEST = 'GET_IMAGE_SLIDER_REQUEST';
export const GET_IMAGE_SLIDER_SUCCESS = 'GET_IMAGE_SLIDER_SUCCESS';
export const GET_IMAGE_SLIDER_FAIL = 'GET_IMAGE_SLIDER_FAIL';

export function getImagesSliderRequest() {
  return {
    type: GET_IMAGE_SLIDER_REQUEST,
    payload: {}
  };
}

export const GET_ORDER_LIST_REQUEST = 'GET_ORDER_LIST_REQUEST';
export const GET_ORDER_LIST_SUCCESS = 'GET_ORDER_LIST_SUCCESS';
export const GET_ORDER_LIST_FAIL = 'GET_ORDER_LIST_FAIL';

export function orderListRequest(page) {
  return {
    type: GET_ORDER_LIST_REQUEST,
    payload: { page },
  };
}
export const UPDATE_ORDER_STATUS_REQUEST = 'UPDATE_ORDER_STATUS_REQUEST';
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS';
export const UPDATE_ORDER_STATUS_FAIL = 'UPDATE_ORDER_STATUS_FAIL';

export function updateOrderStatusRequest(id) {
  return {
    type: UPDATE_ORDER_STATUS_REQUEST,
    payload: { id },
  };
}

export const UPDATE_SLIDE_IMAGE_DESC_REQUEST = 'UPDATE_SLIDE_IMAGE_DESC_REQUEST';
export const UPDATE_SLIDE_IMAGE_DESC_SUCCESS = 'UPDATE_SLIDE_IMAGE_DESC_SUCCESS';
export const UPDATE_SLIDE_IMAGE_DESC_FAIL = 'UPDATE_SLIDE_IMAGE_DESC_FAIL';

export function updateSliderImageDescRequest(id, imageTitle, imageDescription, catalogLink) {
  return {
    type: UPDATE_SLIDE_IMAGE_DESC_REQUEST,
    payload: {id, imageTitle, imageDescription, catalogLink },
  };
}
