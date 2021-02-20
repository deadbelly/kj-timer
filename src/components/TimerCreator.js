import React from 'react';
import timeFormater from '../timeFormater'

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

  increment = (event) => {
    event.preventDefault()
    this.setState({seconds: this.state.seconds + 1})
  }

  decrement = (event) => {
    event.preventDefault()
    if (this.state.seconds - 1 > -1) {
      this.setState({seconds: this.state.seconds - 1})
    }
  }

  startHold = (callback, event) => {
    this.setState({interval: 'awaiting'})
    setTimeout(() => {
      if (this.state.interval === 'awaiting') {
        this.setState({interval: setInterval(callback, 50 , event)})
      }
    }, 1000)
  }

  cancelHold = () => {
    this.setState({interval: clearInterval(this.state.interval)})
  }

  clearInputs = () => {
    this.setState({title: '', seconds: 0})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.addTimer(this.state)
    this.clearInputs()
  }

  render() {
    return (
      <form>
        <input
          name='title'
          type='text'
          value={this.state.title}
          onChange={this.updateTitle}
        />
        <h2>{timeFormater.format(this.state.seconds)}</h2>
        <div className="time-control">
          <button
            onClick={event => {
              event.preventDefault()
            }}
            onMouseDown={event => {
              this.decrement(event)
              this.startHold(this.decrement, event)
            }}
            onMouseUp={this.cancelHold}
          >-</button>
          <button
            onClick={event => {
              event.preventDefault()
            }}
            onMouseDown={event => {
              this.increment(event)
              this.startHold(this.increment, event)
            }}
            onMouseUp={this.cancelHold}
          >+</button>
        </div>
        <button onClick={this.handleSubmit}>ADD TIMER</button>
      </form>
    );
  }
}

export default TimerCreator
