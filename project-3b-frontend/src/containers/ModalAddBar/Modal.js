import React from 'react';
import Button from "@material-ui/core/Button";
import classes from './Modal.module.css';

const Modal = (props) => {
  const { closeModal } = props;

  return (
    <div className={classes.overlay}>
      <div className={classes.content}>

        <h1>Add Bar</h1>
        <p>Name</p>
          <input type="text"/>
        <p>Label</p>
          <input type="text"/>

        <p>Bar Colour</p>
        <button className={classes.barColour1}> </button>
        <button className={classes.barColour2}> </button>

        <p>Start Time</p>

        <p>End Time</p>


        <button  onClick={closeModal} className={classes.subButton}> Submit</button>
        <button  onClick={closeModal} className={classes.cancelButton} > Cancel</button>


      </div>

    </div>
  );
};

export default Modal;