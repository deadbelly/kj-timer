import React from 'react'
import timeFormater from '../../timeFormater'
import './QueuedTimer.scss'

const QueuedTimer = ({timer, copyTimer, removeTimer}) => {
  const {title, seconds, id, color} = timer
  return (
    <div className={`queued-timer ${color} widget`}>
      <h4>{title}</h4>
      <p>{timeFormater.format(seconds)}</p>
      <div className='queued-controls'>
        <button onClick={() => copyTimer(timer)}>COPY</button>
        <button onClick={() => removeTimer(id)}>REMOVE</button>
      </div>
    </div>
  )
}

export default QueuedTimer
