import React, { useState } from 'react';
import classes from './ModalConnector.module.css';

const SelectBarColour = () => {
  /*const [colours] = React.useState([
    {
      label: 'Orange',
      value: 'Orange'
    },
    { label: 'Green', value: 'Green' }
  ]); */

  const [colour, setColour] = useState('');

  const handleSelect = e => {
    setColour(e);
    console.log('colour selected');
  };

  return (
    /*  <select>
      {colours.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select> */

    <div>
      <p>Select Bar Colour</p>
      <div>
        <select value={colour} className={classes.dropDown} onSelect={handleSelect}>
          <option>Select</option>
          <option className={classes.barColour2}>Orange</option>
          <option className={classes.barColour1}>Green</option>
        </select>
      </div>
    </div>
  );
};

export default SelectBarColour;
