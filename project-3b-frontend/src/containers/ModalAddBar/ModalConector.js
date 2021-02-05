import React,  { useState } from 'react';
import './Modal.css';
import Modal from "./Modal";
function ModalConnector() {
  const [status, setStatus] = useState(false);
  return (
    <div>
      { status && (<Modal closeModal={() => setStatus(false)}><h2>Add To Schedule</h2></Modal>)}
      <div className="container">
        <button type="button" className="gantt-control-button" id="new-task" onClick={() => setStatus(true)}>
          Add New Bar
        </button>
      </div>

    </div>
  );
}

export default ModalConnector;