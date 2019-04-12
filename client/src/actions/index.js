import axios from 'axios';
import { FETCH_USER } from './types';

// treat as async, return dispatch upon successful get
const fetchUser = () => {
  return function(dispatch) {
    axios
      .get('./api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  };
};
