import React, { useState } from 'react';

import Modal from './Modal';
import SelectingUser from './SelectingUser';

import BarTime from './BarTime';
import classes from './ModalConnector.module.css';
import SelectBarColour from './SelectBarColour';

const ModalConnector = () => {
  const [status, setStatus] = useState(false);

  const modalClosedHandler = () => {
    setStatus(false);
  };

  const modalSubmitHandler = () => {
    setStatus(false);
  };

  return (
    <div>
      <Modal show={status} modalClosed={modalClosedHandler}>
        <h1>Add New Bar</h1>
        <SelectingUser />
        <p>Label</p>
        <input type="text" />
        <SelectBarColour />
        <BarTime />
        <button onClick={modalClosedHandler} className={classes.subButton}>
          Submit
        </button>
        <button onClick={modalSubmitHandler} className={classes.cancelButton}>
          Cancel
        </button>
      </Modal>
      <button
        type="button"
        className="gantt-control-button"
        id="new-task"
        onClick={() => setStatus(true)}
      >
        Add New Bar
      </button>
    </div>
  );
};

export default ModalConnector;
