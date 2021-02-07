import React from 'react';
import classes from './Modal.module.css';
import SelectingBarColour from './SelectingBarColour';
import SelectingUser from './SelectingUser';
import BarTime from './BarTime';

const Modal = (props) => {
  const { closeModal } = props;

  return (
    <div className={classes.overlay}>
      <div className={classes.content}>
        <h1>Add Bar</h1>
          <SelectingUser/>
          <p>Label</p>
          <input type="text"/>
          <SelectingBarColour/>
           <BarTime/>

        <button  onClick={closeModal} className={classes.subButton}> Submit</button>
        <button  onClick={closeModal} className={classes.cancelButton} > Cancel</button>

      </div>

    </div>
  );
};

export default Modal;