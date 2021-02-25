import {
  CREATE_SIDEBAR_TITLE_FAIL,
  CREATE_SIDEBAR_TITLE_REQUEST,
  CREATE_SIDEBAR_TITLE_SUCCESS,
  CREATE_UPDATE_SIDEBAR_TITLES_FAIL,
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

const initialState = {
  error: '',
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SIDEBAR_TITLES_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_SIDEBAR_TITLES_SUCCESS: {
      const { sidebarTitles } = action.payload.data;
      return {
        sidebarTitles,
        ...state,
      };
    }
    case GET_SIDEBAR_TITLES_FAIL: {
      const {message} = action.payload.data;
      return {
        ...state,
        error: message,
      };
    }
    case CREATE_UPDATE_SIDEBAR_TITLES_REQUEST: {
      return {
        ...state,
      };
    }
    case CREATE_UPDATE_SIDEBAR_TITLES_SUCCESS: {
      return {
        ...state,
      };
    }
    case CREATE_UPDATE_SIDEBAR_TITLES_FAIL: {
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
