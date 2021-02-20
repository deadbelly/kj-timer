import React from 'react';
import TimerCreator from './TimerCreator';
import Schedule from './Schedule';
import ActiveTimer from './ActiveTimer';
import '../App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      formTitle: '',
      formTime: 0,
      timers: [],
      activeTimer: null
    }
  }

  componentDidUpdate() {
    if (this.state.timers.length && !this.state.activeTimer) {
      this.setState({
        activeTimer: this.state.timers[0],
        timers: this.state.timers.splice(1)
      })
    }
  }

  updateTitle = (event) => {
    this.setState({formTitle: event.target.value})
  }

  incrementTime = (event) => {
    event.preventDefault()
    console.log('inc')
    this.setState({formTime: this.state.formTime + 1})
  }

  decrementTime = (event) => {
    event.preventDefault()
    if (this.state.formTime - 1 > -1) {
      console.log('dec')
      this.setState({formTime: this.state.formTime - 1})
    }
  }

  clearInputs = () => {
    this.setState({formTitle: '', formTime: 0})
  }

  addTimer = event => {
    event.preventDefault();
    this.setState({timers: [
      ...this.state.timers,
      {
        id: Date.now(),
        title: this.state.formTitle,
        seconds: this.state.formTime
    }]});
    this.clearInputs();
  }

  removeTimer = id => {
    const newList = this.state.timers.filter(timer => timer.id !== id)
    this.setState({timers: newList})
  }

  clearTimer = () => {
    this.setState({activeTimer: null})
  }

  render() {
    return (
      <>
        <TimerCreator
          title={this.state.formTitle}
          time={this.state.formTime}
          updateTitle={this.updateTitle}
          increment={this.incrementTime}
          decrement={this.decrementTime}
          addTimer={this.addTimer}
        />
        <Schedule
          timers={this.state.timers}
          removeTimer={this.removeTimer}
        />
        {this.state.activeTimer &&
          <ActiveTimer
            timer={this.state.activeTimer}
            clearTimer={this.clearTimer}
          />
        }
      </>
    );
  }
}

export default App;
