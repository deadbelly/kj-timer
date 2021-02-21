import React from 'react'
import timeFormater from '../../timeFormater'

const QueuedTimer = ({timer, copyTimer, removeTimer}) => {
  const {title, seconds, id} = timer
  return (
    <div className="queued-timer">
      <h4>{title}</h4>
      <p>{timeFormater.format(seconds)}</p>
      <button onClick={() => copyTimer(timer)}>COPY</button>
      <button onClick={() => removeTimer(id)}>REMOVE</button>
    </div>
  )
}

export default QueuedTimer
