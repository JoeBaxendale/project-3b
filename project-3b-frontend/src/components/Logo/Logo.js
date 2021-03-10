import React from 'react';

import btLogo from '../../assets/images/bt-logo.svg';
import classes from './Logo.module.css';

const Logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={btLogo} alt="BT logo" />
  </div>
);

export default Logo;
