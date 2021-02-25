import { combineReducers } from 'redux';
import sign from './sign';
import products from './products';
import filters from './filters';

export default combineReducers({
  sign,
  products,
  filters,
});
