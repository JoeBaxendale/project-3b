import React from 'react';
import classes from './Modal.module.css';


const SelectingUser= ({rows}) => {


  return (
    <div>
        <p>Name</p>
        <select>
          {rows}
        </select>

      </div>
  );
};

export default SelectingUser;