import React from 'react';
import Button from "@material-ui/core/Button";

// close button
//need add form component link here

const Modal = (props) => {
  const { closeModal } = props;

  return (
    <div className="overlay">
      <div className="content">
        {props.children}
        <textarea placeholder="form to add new bar link to component"/>
        <Button variant="contained" color="primary" onClick={closeModal}> Cancel</Button>

      </div>

    </div>
  );
};

export default Modal;