import React from 'react';
import Button from "@material-ui/core/Button";
import classes from './Modal.module.css';

const Modal = (props) => {
  const { closeModal } = props;

  return (
    <div className={classes.overlay}>
      <div className={classes.content}>
        <form>
        <h1>Add Bar</h1>
        <p>Name</p>
          <input type="text"/>
        <p>Label</p>
          <input type="text"/>

        <p>Start Time</p>

        <p>End Time</p>

        <p>Bar Colour</p>


        <Button variant="contained" color="primary" onClick={closeModal}> Submit</Button>
        <Button variant="contained" color="secondary" onClick={closeModal}> Cancel</Button>
        </form>
      </div>

    </div>
  );
};

export default Modal;