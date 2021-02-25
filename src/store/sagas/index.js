import { fork, all } from 'redux-saga/effects';
import sign from './sign';
import products from './products';
import filters from './filters';


export default function* watchers() {
  yield all([
    sign,
    products,
    filters,
  ].map(fork));
}
