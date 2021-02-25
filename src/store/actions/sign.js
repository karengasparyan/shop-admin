export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';

export function signInRequest(userName, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { userName, password },
  };
}
