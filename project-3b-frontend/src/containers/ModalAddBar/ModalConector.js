import React,  { useState } from 'react';
import Modal from "./Modal";
function ModalConnector() {
  const [status, setStatus] = useState(false);
  return (
    <div>
      { status && (<Modal closeModal={() => setStatus(false)}></Modal>)}
        <button type="button" className="gantt-control-button" id="new-task" onClick={() => setStatus(true)}>
          Add New Bar
        </button>

    </div>
  );
}

export default ModalConnector;