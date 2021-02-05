import React from 'react';
import Button from "@material-ui/core/Button";
// close button
//need add form component link here
import './Modal.css'
const Modal = (props) => {
  const { closeModal } = props;

  return (
    <div className="overlay">
      <div className="content">
        <h2>Add Bar</h2>
        <p>Name</p>
        <textarea placeholder="form to add new bar link to component"/>

        <p>Shift Type</p>

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