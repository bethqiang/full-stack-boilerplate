import React, { PropTypes } from 'react';

/* ----------------- COMPONENT ------------------ */

const App = props => (
  <div>
    <h1>Hello world!</h1>
    {props.children && React.cloneElement(props.children, props)}
  </div>
);

/* ----------------- PROP TYPES ------------------ */

App.propTypes = {
  children: PropTypes.node
};

App.defaultProps = {
  children: null
};

export default App;
