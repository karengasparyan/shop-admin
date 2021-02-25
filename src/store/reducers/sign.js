import {
  SIGN_IN_FAIL,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
} from '../actions/sign';
import Account from '../../helpers/Account';

const initialState = {
  token: Account.getToken(),
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case SIGN_IN_SUCCESS: {
      const { token } = action.payload.data;
      Account.setToken(token);
      return {
        ...state,
        token,
      };
    }
    case SIGN_IN_FAIL: {
      const { message } = action.payload.data;
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
