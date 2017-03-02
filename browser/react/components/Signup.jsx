import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { signup } from '../../redux/reducers/auth-reducer';

/* ----------------- COMPONENT ------------------ */

const Signup = props => (
  <div>
    <h3>Sign Up</h3>
    <form onSubmit={props.signup}>
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
      <button type="submit">Sign Up</button>
    </form>
  </div>
);

/* ----------------- PROP TYPES ------------------ */

Signup.propTypes = {
  signup: PropTypes.func.isRequired
};

/* ----------------- CONTAINER ------------------ */

const mapDispatchToProps = dispatch => ({
  signup(evt) {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(signup(email, password));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Signup);
