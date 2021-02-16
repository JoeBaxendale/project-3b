import React, { useState } from 'react';
import Modal from './Modal';
import classes from './ModalConnector.module.css';

const ModalConnector = () => {
  const [status, setStatus] = useState(false);

  const modalClosedHandler = () => {
    setStatus(false);
  };
  // button colours and names dynamic from json file and depend on the system in use
  //would open from clicking name row
  return (
    <div>
      <Modal show={status} modalClosed={modalClosedHandler}>
        <h1>Add </h1>
        <button className={classes.barButton} onClick={modalClosedHandler}>
          Shift
        </button>
        <button className={classes.barButton2} onClick={modalClosedHandler}>
          Absence
        </button>
        <button className={classes.barButton3} onClick={modalClosedHandler}>
          OverTime
        </button>
        <button onClick={modalClosedHandler} className={classes.cancelButton}>
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
