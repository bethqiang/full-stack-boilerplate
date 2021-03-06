import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { login, logout } from '../../redux/reducers/auth-reducer';

/* ----------------- COMPONENT ------------------ */

const Login = props => (
  <div>
    <h3>Log In</h3>
    <form onSubmit={props.login}>
      <div>
        <input
          name="email"
          type="email"
          placeholder="email"
          required
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="password"
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
    <button onClick={props.logout}>Log Out</button>
  </div>
);

/* ----------------- PROP TYPES ------------------ */

Login.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

/* ----------------- CONTAINER ------------------ */

const mapDispatchToProps = dispatch => ({
  login(evt) {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(login(email, password));
  },
  logout() {
    dispatch(logout());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
