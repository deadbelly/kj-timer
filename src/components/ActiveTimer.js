import React from 'react'
import Countdown, { zeroPad } from 'react-countdown'

const ActiveTimer = ({timer, clearTimer}) => {
  const timerMilli = timer.seconds * 1000

  const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <h1>DONE</h1>
  } else {
    return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
  }
}

  return (
    <main>
      <h2>{timer.title}</h2>
      <Countdown
        date={Date.now() + timerMilli}
        renderer={renderer}
        onComplete={clearTimer}
      />
    </main>
  )
}

export default ActiveTimer
