import { takeLatest, call, put } from 'redux-saga/effects';
import Api from '../../Api';
import {
  CREATE_PRODUCTS_FAIL,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAIL,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  GET_ATTRIBUTES_FAIL,
  GET_ATTRIBUTES_REQUEST,
  GET_ATTRIBUTES_SUCCESS, GET_IMAGE_SLIDER_FAIL,
  GET_IMAGE_SLIDER_REQUEST,
  GET_IMAGE_SLIDER_SUCCESS,
  GET_ORDER_LIST_FAIL,
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  SINGLE_PRODUCTS_FAIL,
  SINGLE_PRODUCTS_REQUEST,
  SINGLE_PRODUCTS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_PRODUCTS_FAIL,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS,
  UPLOAD_IMAGE_PRODUCTS_FAIL,
  UPLOAD_IMAGE_PRODUCTS_REQUEST,
  UPLOAD_IMAGE_PRODUCTS_SUCCESS,
  UPLOAD_IMAGE_SLIDER_FAIL,
  UPLOAD_IMAGE_SLIDER_REQUEST,
  UPLOAD_IMAGE_SLIDER_SUCCESS
} from "../actions/products";

function* getProducts(action) {
  try {
    const { query } = action.payload;
    const { data } = yield call(Api.getProducts, query);
    yield put({
      type: GET_PRODUCTS_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_PRODUCTS_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* singleProduct(action) {
  try {
    const { productId } = action.payload;
    const { data } = yield call(Api.singleProduct, productId);
    yield put({
      type: SINGLE_PRODUCTS_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: SINGLE_PRODUCTS_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* deleteProducts(action) {
  try {
    const { productsId } = action.payload;
    const { data } = yield call(Api.deleteProducts, productsId);
    yield put({
      type: DELETE_PRODUCTS_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: DELETE_PRODUCTS_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* createProduct(action) {
  try {
    const { requestData } = action.payload;
    const { data } = yield call(Api.createProduct, requestData);
    yield put({
      type: CREATE_PRODUCTS_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    yield put({
      type: CREATE_PRODUCTS_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

function* updateProduct(action) {
  try {
    const { requestData } = action.payload;
    const { data } = yield call(Api.updateProduct, requestData);
    yield put({
      type: UPDATE_PRODUCTS_SUCCESS,
      payload: { data },
    });
    if (action.payload.cb) {
      action.payload.cb(null, data)
    }
  } catch (e) {
    console.error(e)
    yield put({
      type: UPDATE_PRODUCTS_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
    if (action.payload.cb) {
      action.payload.cb(e, null)
    }
  }
}

function* getAttributes(action) {
  try {
    // const {} = action.payload;
    const { data } = yield call(Api.getAttributes);
    yield put({
      type: GET_ATTRIBUTES_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_ATTRIBUTES_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* uploadImageProduct(action) {
  try {
    const { files, images, productId } = action.payload;
    const { data } = yield call(Api.uploadImageProduct, files, images, productId);
    yield put({
      type: UPLOAD_IMAGE_PRODUCTS_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGE_PRODUCTS_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* uploadImageSlider(action) {
  try {
    const { files, images } = action.payload;
    const { data } = yield call(Api.uploadImageSlider, files, images);
    yield put({
      type: UPLOAD_IMAGE_SLIDER_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGE_SLIDER_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* getImageSlider() {
  try {
    const { data } = yield call(Api.getImageSlider);
    yield put({
      type: GET_IMAGE_SLIDER_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_IMAGE_SLIDER_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* orderList(action) {
  try {
    const { page } = action.payload;
    const { data } = yield call(Api.orderList, page);
    yield put({
      type: GET_ORDER_LIST_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_ORDER_LIST_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* updateOrderStatus(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(Api.updateOrderStatus, id);
    yield put({
      type: UPDATE_ORDER_STATUS_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: UPDATE_ORDER_STATUS_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}


export default function* watcher() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProducts);
  yield takeLatest(SINGLE_PRODUCTS_REQUEST, singleProduct);
  yield takeLatest(DELETE_PRODUCTS_REQUEST, deleteProducts);
  yield takeLatest(CREATE_PRODUCTS_REQUEST, createProduct);
  yield takeLatest(UPDATE_PRODUCTS_REQUEST, updateProduct);
  yield takeLatest(GET_ATTRIBUTES_REQUEST, getAttributes);
  yield takeLatest(UPLOAD_IMAGE_PRODUCTS_REQUEST, uploadImageProduct);
  yield takeLatest(UPLOAD_IMAGE_SLIDER_REQUEST, uploadImageSlider);
  yield takeLatest(GET_IMAGE_SLIDER_REQUEST, getImageSlider);
  yield takeLatest(GET_ORDER_LIST_REQUEST, orderList);
  yield takeLatest(UPDATE_ORDER_STATUS_REQUEST, updateOrderStatus);
}
