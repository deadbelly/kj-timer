import React from 'react';
import { useTimer } from 'react-timer-hook';

const Schedule = (activeTimers) => {
  const timers = activeTimers.map(timer => {
    const {hours, minutes, seconds} = useTimer({ expiryTimestamp: timer.time, onExpire: () => console.warn('finished') })

    return (
      <div>
        <p> hours </p>
        <p> minutes </p>
        <p> seconds </p>
      </div>
    )
  })
  return (
    <>
      timers
    </>
  )
}

export default Schedule
