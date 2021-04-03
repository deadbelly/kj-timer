import React from 'react'
import Countdown, { zeroPad } from 'react-countdown'
import './ActiveTimer.css'

class ActiveTimer extends React.Component {
  constructor() {
    super()
  }

  shouldComponentUpdate(nextProps) {
    const {timer} = this.props

    return timer.seconds !== nextProps.timer.seconds
  }

  render() {
    const {timer, clearTimer, autostart, runAutostart, removeTimer} = this.props

    const timerMilli = timer.seconds * 1000

    const renderer = ({ minutes, seconds, api }) => {
      const { start, pause, isStopped } = api
      return (
        <>
          {autostart && isStopped() && start()}
          <h1>{zeroPad(minutes)}:{zeroPad(seconds)}</h1>
          <div className='controls'>
            <button onClick={() => {
              runAutostart(true)
              start()
            }}>START</button>
            <button onClick={() => {
              runAutostart(false)
              pause()
            }}>PAUSE</button>
            <button onClick={() => removeTimer(timer.id)}>REMOVE</button>
            <button onClick={clearTimer}>FINISH</button>
          </div>
        </>
      )
    }

    return (
      <>
        <h2>{timer.title}</h2>
        <Countdown
          date={Date.now() + timerMilli}
          renderer={renderer}
          onComplete={clearTimer}
          onMount={() => {
            if(autostart){
              this.ref.start()
            }
          }}
          autoStart={autostart}
        />
      </>
    )
  }
}

export default ActiveTimer
