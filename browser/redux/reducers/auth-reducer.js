import { Map } from 'immutable';
import axios from 'axios';
import { browserHistory } from 'react-router';

/* --------------- INITIAL STATE --------------- */

const initialState = null;

/* --------------- ACTIONS --------------- */

const AUTHENTICATED = 'AUTHENTICATED';

/* --------------- ACTION CREATORS --------------- */

const authenticated = user => ({
  type: AUTHENTICATED,
  user
});

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/local/login', { username, password })
      .then((response) => {
        const user = Map(response.data);
        dispatch(authenticated(user));
      })
      .then(() => browserHistory.push('/'))
      .catch(err => console.log(err));

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then((response) => {
        dispatch(authenticated(null));
      })
      .then(() => browserHistory.push('/'))
      .catch(err => console.log(err));

/* --------------- REDUCER --------------- */

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user;
    default:
      return state;
  }
}
