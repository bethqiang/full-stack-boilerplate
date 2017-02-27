import React from 'react';
import { connect } from 'react-redux';

import { login } from '../../redux/reducers/auth-reducer';

/* ----------------- COMPONENT ------------------ */

const Login = props => (
  <div>
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
  </div>
);

/* ----------------- CONTAINER ------------------ */

const mapDispatchToProps = dispatch => ({
  login(evt) {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(login(email, password));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
