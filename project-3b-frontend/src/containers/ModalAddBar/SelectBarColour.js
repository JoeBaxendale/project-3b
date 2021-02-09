import React, { useState } from 'react';
import classes from './ModalConnector.module.css';

const SelectBarColour = () => {
  const [colour, setColour] = useState('');

  const handleSelect = e => {
    setColour(e);
    console.log('colour selected');
  };

  return (
    <div>
      <p>Select Bar Colour</p>
      <div>
        <select className={classes.dropDown} onSelect={handleSelect}>
          <option>Select</option>
          <option className={classes.barColour2}>Orange</option>
          <option className={classes.barColour1}>Green</option>
        </select>
      </div>
    </div>
  );
};

export default SelectBarColour;
