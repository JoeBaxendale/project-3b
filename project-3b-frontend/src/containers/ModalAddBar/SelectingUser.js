import React from 'react';
import classes from './Modal.module.css';

const SelectingUser = ({ rows }) => {
  return (
    <div>
      <p>Name</p>

      <select className={classes.dropDown}>{rows}</select>
    </div>
  );
};

export default SelectingUser;
