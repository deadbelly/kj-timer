import React from 'react';
import QueuedTimer from './QueuedTimer'

const Schedule = ({timers, removeTimer}) => {
  const queue = timers.map(timer =>
    <QueuedTimer
      key={timer.id}
      timer={timer}
      removeTimer={removeTimer}
    />
  )
  return (
    <div className='schedule'>
      {queue}
    </div>
  )
}

export default Schedule
