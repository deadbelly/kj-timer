import React from 'react';
import timeFormater from '../../timeFormater'
import Draggable from 'react-draggable'

class TimerCreator extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      seconds: 0,
      interval: null
    }
  }

  updateTitle = (event) => {
    this.setState({title: event.target.value})
  }

  increment = (unit, event) => {
    event.preventDefault()
    this.setState({seconds: this.state.seconds + unit})
  }

  decrement = (unit, event) => {
    event.preventDefault()
    if (this.state.seconds - 1 > -1) {
      this.setState({seconds: this.state.seconds - unit})
    }
  }

  speedUp = (callback, unit, event) => {
    setTimeout(() => {
      if (this.state.interval === 'awaiting') {
        this.setState({interval: setInterval(callback, 75, unit, event)})
      }
    }, 1000)
  }

  startHold = (callback, unit, event) => {
    this.setState({interval: 'awaiting'})
    this.speedUp(callback, unit, event)
  }

  cancelHold = () => {
    this.setState({interval: clearInterval(this.state.interval)})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addTimer(this.state)
  }

  render() {
    return (
      <Draggable>
        <form className='blue'>
          <input
            name='title'
            type='text'
            value={this.state.title}
            placeholder='Timer Title'
            onChange={this.updateTitle}
          />
          <h2>{timeFormater.format(this.state.seconds)}</h2>
          <div className="time-control">
            <div className="time-control--minutes">
              <button
                onClick={event => {
                  event.preventDefault()
                }}
                onMouseDown={event => {
                  this.decrement(60, event)
                  this.startHold(this.decrement, 60, event)
                }}
                onMouseUp={this.cancelHold}
              >-</button>
              <button
                onClick={event => {
                  event.preventDefault()
                }}
                onMouseDown={event => {
                  this.increment(60, event)
                  this.startHold(this.increment, 60, event)
                }}
                onMouseUp={this.cancelHold}
              >+</button>
            </div>
            <div className="time-control--seconds">
              <button
                onClick={event => {
                  event.preventDefault()
                }}
                onMouseDown={event => {
                  this.decrement(1, event)
                  this.startHold(this.decrement, 1, event)
                }}
                onMouseUp={this.cancelHold}
              >-</button>
              <button
                onClick={event => {
                  event.preventDefault()
                }}
                onMouseDown={event => {
                  this.increment(1, event)
                  this.startHold(this.increment, 1, event)
                }}
                onMouseUp={this.cancelHold}
              >+</button>
            </div>
          </div>
          <button onClick={this.handleSubmit}>ADD TIMER</button>
        </form>
      </Draggable>
    );
  }
}

export default TimerCreator
