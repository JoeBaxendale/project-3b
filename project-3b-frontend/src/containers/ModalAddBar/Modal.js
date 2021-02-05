import React from 'react';
import Button from "@material-ui/core/Button";

import './Modal.css'
const Modal = (props) => {
  const { closeModal } = props;

  return (
    <div className="overlay">
      <div className="content">
        <h1>Add Bar</h1>
        <p>Name</p>
        <textarea placeholder="form to add new bar link to component"/>

        <p>Start Time</p>

        <p>End Time</p>

        <p>Colour</p>

        <Button variant="contained" color="primary" onClick={closeModal}> Submit</Button>
        <Button variant="contained" color="secondary" onClick={closeModal}> Cancel</Button>
      </div>

    </div>
  );
};

export default Modal;