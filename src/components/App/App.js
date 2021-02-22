import React from 'react';
import TimerCreator from '../TimerCreator/TimerCreator';
import Schedule from '../Schedule/Schedule';
import ActiveTimer from '../ActiveTimer/ActiveTimer';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      timers: [],
      activeTimer: null,
      autostart: false
    }
  }

  componentDidMount() {
    if (localStorage.getItem('state')) {
      this.setState({
          ...JSON.parse(localStorage.getItem('state')),
        autostart: false
      })
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

  addTimer = formState => {
    const { title, seconds } = formState
    this.setState({timers: [
      ...this.state.timers,
      {
        id: Date.now(),
        title,
        seconds
    }]});
  }

  removeTimer = id => {
    this.setState({
      timers: this.state.timers.filter(timer => timer.id !== id),
      activeTimer: (this.state.activeTimer.id == id ? null : this.state.activeTimer)
    })
  }

  clearTimer = () => {
    this.setState({
      timers: [
        ...this.state.timers,
        this.state.activeTimer
      ],
      activeTimer: null
    })
  }

  handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(this.state.timers)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    this.setState({timers: items})
  }

  runAutostart = () => {
    this.setState({autostart: true})
  }

  render() {
    return (
      <div class='app'>
        <TimerCreator
          addTimer={this.addTimer}
        />
        <main>
          {this.state.activeTimer &&
            <ActiveTimer
              timer={this.state.activeTimer}
              clearTimer={this.clearTimer}
              autostart={this.state.autostart}
              runAutostart={this.runAutostart}
              removeTimer={this.removeTimer}
            />
          }
        </main>
        <Schedule
          timers={this.state.timers}
          removeTimer={this.removeTimer}
          addTimer={this.addTimer}
          handleOnDragEnd={this.handleOnDragEnd}
        />
      </div>
    );
  }
}

export default App;