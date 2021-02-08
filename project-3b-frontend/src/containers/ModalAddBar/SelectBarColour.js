import React, { useState } from 'react';
import classes from './ModalConnector.module.css';

const SelectBarColour = () => {
  return (
    <div>
      <p>Select a bar colour</p>
      <select>
        <option>Select</option>
        <option className={classes.barColour2}>Orange</option>
        <option className={classes.barColour1}>Green</option>
      </select>
    </div>
  );
};

export default SelectBarColour;
