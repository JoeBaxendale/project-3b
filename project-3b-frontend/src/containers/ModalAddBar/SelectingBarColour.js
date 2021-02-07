import React from 'react';

import classes from './Modal.module.css';


const SelectingBarColour = () => {
  //change blocks to checkbox
  return (
    <div>
      <p>Bar Colour</p>
      <button className={classes.barColour1}> </button>
      <button className={classes.barColour2}> </button>

    </div>
  );


}

export default SelectingBarColour ;