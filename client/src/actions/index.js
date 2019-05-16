import axios from 'axios';
import { FETCH_USER } from './types';

// treat as async, return dispatch upon successful get
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// return same dispatcha fter getting token back from Stripe API
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = values => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  dispatch({ type: FETCH_USER, payload: res.data });
};
