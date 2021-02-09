import React, { useState } from 'react';

import DateTimePicker from 'react-datetime-picker';
const BarTime = () => {
  const [StartTime, NewStartTime] = useState(new Date());
  const [EndTime, NewEndTime] = useState(new Date());
  return (
    <div>
      <p>Start Time</p>
      <div>
        <DateTimePicker NewStartTime={NewStartTime} StartTime={StartTime} />
      </div>
      <p>End Time</p>
      <div>
        <DateTimePicker NewEndTime={NewEndTime} EndTime={EndTime} />
      </div>
    </div>
  );
};

export default BarTime;
