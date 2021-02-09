import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
const BarTime = () => {
  const [StartTime, NewStartTime] = useState('10:00');
  const [EndTime, NewEndTime] = useState('10:00');
  return (
    <div>
      <p>Start Time</p>
      <div>
        <TimePicker NewStartTime={NewStartTime} StartTime={StartTime} />
      </div>
      <p>End Time</p>
      <div>
        <TimePicker NewEndTime={NewEndTime} EndTime={EndTime} />
      </div>
    </div>
  );
};

export default BarTime;
