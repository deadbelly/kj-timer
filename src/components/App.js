import React from 'react';
import TimerCreator from './TimerCreator';
import Schedule from './Schedule';
import ActiveTimer from './ActiveTimer';
import '../App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      timers: [],
      activeTimer: null
    }
  }

  componentDidMount() {
    if (localStorage.getItem('state')) {
      const storedState = JSON.parse(localStorage.getItem('state'))
      this.setState(storedState)
    }
  }

  componentDidUpdate() {
    if (this.state.timers.length && !this.state.activeTimer) {
      this.setState({
        activeTimer: this.state.timers[0],
        timers: this.state.timers.splice(1)
      })
    }
    localStorage.setItem('state', JSON.stringify(this.state))
  }

  addTimer = timer => {
    this.setState({timers: [
      ...this.state.timers,
      {
        id: Date.now(),
        ...timer
    }]});
  }

  removeTimer = id => {
    const newList = this.state.timers.filter(timer => timer.id !== id)
    this.setState({timers: newList})
  }

  clearTimer = () => {
    this.setState({activeTimer: null})
  }

  handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(this.state.timers)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    this.setState({timers: items})
  }

  render() {
    return (
      <>
        <TimerCreator
          addTimer={this.addTimer}
        />
        <Schedule
          timers={this.state.timers}
          removeTimer={this.removeTimer}
          handleOnDragEnd={this.handleOnDragEnd}
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
