import React from 'react'
import alarm from './alarmAsset.wav'

const Alarm = () => {

  return (
    <>
      <audio className="audio" volume="1">
            <source src={alarm}></source>
      </audio>
    </>
  )
}

export default Alarm
