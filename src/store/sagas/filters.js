import { takeLatest, call, put } from 'redux-saga/effects';
import Api from '../../Api';
import {

} from "../actions/products";
import {
  CREATE_SIDEBAR_TITLE_FAIL,
  CREATE_SIDEBAR_TITLE_REQUEST,
  CREATE_SIDEBAR_TITLE_SUCCESS, CREATE_UPDATE_SIDEBAR_TITLES_FAIL,
  CREATE_UPDATE_SIDEBAR_TITLES_REQUEST,
  CREATE_UPDATE_SIDEBAR_TITLES_SUCCESS,
  DELETE_SIDEBAR_TITLE_FAIL,
  DELETE_SIDEBAR_TITLE_REQUEST,
  DELETE_SIDEBAR_TITLE_SUCCESS,
  EDIT_SIDEBAR_TITLES_FAIL,
  EDIT_SIDEBAR_TITLES_REQUEST,
  EDIT_SIDEBAR_TITLES_SUCCESS,
  GET_SIDEBAR_TITLES_FAIL,
  GET_SIDEBAR_TITLES_REQUEST,
  GET_SIDEBAR_TITLES_SUCCESS
} from "../actions/filters";

function* getSidebarTitles() {
  try {
    const { data } = yield call(Api.getSidebarTitles);
    yield put({
      type: GET_SIDEBAR_TITLES_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: GET_SIDEBAR_TITLES_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

function* createUpdateSidebarTitle(action) {
  try {
    const {  titles } = action.payload;
    const { data } = yield call(Api.createUpdateSidebarTitle, titles);
    yield put({
      type: CREATE_UPDATE_SIDEBAR_TITLES_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: CREATE_UPDATE_SIDEBAR_TITLES_FAIL,
      message: e.message,
      payload: { data: e.response?.data || {} },
    });
  }
}

export default function* watcher() {
  yield takeLatest(GET_SIDEBAR_TITLES_REQUEST, getSidebarTitles);
  yield takeLatest(CREATE_UPDATE_SIDEBAR_TITLES_REQUEST, createUpdateSidebarTitle);
}
