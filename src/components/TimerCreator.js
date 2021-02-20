import React from 'react';
import timeFormater from '../timeFormater'

class TimerCreator extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      seconds: 0,
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
          <button onClick={this.decrement}>-</button>
          <button onClick={this.increment}>+</button>
        </div>
        <button onClick={this.handleSubmit}>ADD TIMER</button>
      </form>
    );
  }
}

export default TimerCreator
