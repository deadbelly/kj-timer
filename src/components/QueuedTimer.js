import React from 'react'

const QueuedTimer = ({timer, removeTimer}) => {
  const {title, seconds, id} = timer
  return (
    <div className="queued-timer">
      <h4>{title}</h4>
      <p>{seconds}</p>
      <button onClick={() => removeTimer(id)}>REMOVE</button>
    </div>
  )
}

export default QueuedTimer
