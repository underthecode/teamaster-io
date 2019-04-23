import axios from 'axios';
import { FETCH_USER } from './types';

// treat as async, return dispatch upon successful get
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
