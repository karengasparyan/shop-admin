import {
  CREATE_PRODUCTS_FAIL,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAIL,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  GET_ATTRIBUTES_FAIL,
  GET_ATTRIBUTES_REQUEST,
  GET_ATTRIBUTES_SUCCESS, GET_IMAGE_SLIDER_FAIL, GET_IMAGE_SLIDER_REQUEST, GET_IMAGE_SLIDER_SUCCESS,
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
  UPLOAD_IMAGE_PRODUCTS_SUCCESS, UPLOAD_IMAGE_SLIDER_FAIL, UPLOAD_IMAGE_SLIDER_REQUEST, UPLOAD_IMAGE_SLIDER_SUCCESS
} from "../actions/products";
import Utils from "../../helpers/Utils";

const initialState = {
  products: [],
  product: {},
  singleProduct: {},
  productsKeys: [],
  inputKeys: [],
  productCount: null,
  attributeKey: [],
  attributeValue: [],
  images: [],
  paginationActivePage: null,
  productId: null,
  orders: [],
  pageCount: null,
  order: '',
  page: 1,
  sliderImages: [],
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST: {
      const {page} = action.payload;
      return {
        ...state,
        productsRequestStatus: 'request',
        paginationActivePage: page,
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      const { products, productCount, } = action.payload.data;
      let productsKeys = Object.keys(products[0])
      productsKeys = Utils.deleteArrayElement(productsKeys, ['id','description','attributes','createdAt','updatedAt','images','metaName','metaDescription',]);
      productsKeys.push('metaName','metaDescription','attributeKey','attributeValue','images','createdAt','updatedAt')
      productsKeys.unshift('')
      return {
        ...state,
        productsRequestStatus: 'success',
        products,
        productsKeys,
        productCount,
      };
    }
    case GET_PRODUCTS_FAIL: {
      const {message} = action.payload.data;
      return {
        ...state,
        productsRequestStatus: 'fail',
        error: message,
      };
    }

    case SINGLE_PRODUCTS_REQUEST: {
      const {productId} = action.payload;
      return {
        ...state,
        productId,
        error: '',
      };
    }
    case SINGLE_PRODUCTS_SUCCESS: {
      const { singleProduct } = action.payload.data;
      return {
        ...state,
        singleProduct,

      };
    }
    case SINGLE_PRODUCTS_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case DELETE_PRODUCTS_REQUEST: {
      const { productsId } = action.payload;
      return {
        ...state,
        error: '',
        productsId,
      };
    }
    case DELETE_PRODUCTS_SUCCESS: {
      const {products} = state;

      return {
        ...state,
        products,
      };
    }
    case DELETE_PRODUCTS_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case CREATE_PRODUCTS_REQUEST: {
      return {
        ...state,
        error: '',
        info: '',
      };
    }
    case CREATE_PRODUCTS_SUCCESS: {
      const { product } = action.payload.data;
      return {
        ...state,
        product,
      };
    }
    case CREATE_PRODUCTS_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case UPDATE_PRODUCTS_REQUEST: {
      return {
        ...state,
        error: '',
        info: '',
      };
    }
    case UPDATE_PRODUCTS_SUCCESS: {
      const { product } = action.payload.data;
      return {
        ...state,
        singleProduct: product,
      };
    }
    case UPDATE_PRODUCTS_FAIL: {
      const { message } = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case GET_ATTRIBUTES_REQUEST: {
      return {
        ...state,
        error: '',
        info: '',
      };
    }
    case GET_ATTRIBUTES_SUCCESS: {
      const { attributeKey, attributeValue } = action.payload.data;
      return {
        ...state,
        attributeKey,
        attributeValue,
      };
    }
    case GET_ATTRIBUTES_FAIL: {
      const {message} = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case UPLOAD_IMAGE_PRODUCTS_REQUEST: {
      return {
        ...state,
        error: '',
        info: '',
      };
    }
    case UPLOAD_IMAGE_PRODUCTS_SUCCESS: {
      const { images } = action.payload.data;
      return {
        ...state,
        images,
      };
    }
    case UPLOAD_IMAGE_PRODUCTS_FAIL: {
      const {message} = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case UPLOAD_IMAGE_SLIDER_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case UPLOAD_IMAGE_SLIDER_SUCCESS: {
      const { sliderImages } = action.payload.data;
      return {
        ...state,
        sliderImages,
      };
    }
    case UPLOAD_IMAGE_SLIDER_FAIL: {
      const {message} = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case GET_IMAGE_SLIDER_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case GET_IMAGE_SLIDER_SUCCESS: {
      const { sliderImages } = action.payload.data;
      return {
        ...state,
        sliderImages,
      };
    }
    case GET_IMAGE_SLIDER_FAIL: {
      const {message} = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case GET_ORDER_LIST_REQUEST: {
      const {page} = action.payload
      return {
        ...state,
        error: '',
        page,
      };
    }
    case GET_ORDER_LIST_SUCCESS: {
      const { orders, pageCount } = action.payload.data;
      return {
        ...state,
        orders,
        pageCount,
      };
    }
    case GET_ORDER_LIST_FAIL: {
      const {message} = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }

    case UPDATE_ORDER_STATUS_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case UPDATE_ORDER_STATUS_SUCCESS: {
      const { order } = action.payload.data;
      return {
        ...state,
        order,
      };
    }
    case UPDATE_ORDER_STATUS_FAIL: {
      const {message} = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    default: {
      return state;
    }
  }
}
