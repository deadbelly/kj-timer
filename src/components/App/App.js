import React from 'react';
import TimerCreator from '../TimerCreator/TimerCreator';
import Schedule from '../Schedule/Schedule';
import ActiveTimer from '../ActiveTimer/ActiveTimer';
import './App.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      timers: [],
      activeTimer: {
        title: 'Use the Timer Creator to Get Started',
        seconds: 0,
        id: 0,
        color: 'blue'
      },
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
    if (this.state.timers.length && !this.state.activeTimer.id) {
      this.setState({
        activeTimer: this.state.timers[0],
        timers: this.state.timers.splice(1)
      })
    }

    if (!this.state.timers.length && !this.state.activeTimer) {
      this.setState({
        activeTimer: {
          title: 'Use the Timer Creator to Get Started',
          seconds: 0,
          id: 0,
          color: 'blue'
        }
      })
    }
    localStorage.setItem('state', JSON.stringify(this.state))
  }

  addTimer = formState => {
    const { title, seconds, color } = formState
    this.setState({timers: [
      ...this.state.timers,
      {
        id: Date.now(),
        title,
        seconds,
        color
    }]});
  }

  removeTimer = id => {
    if (this.state.activeTimer.id !== 0) {
      this.setState({
        timers: this.state.timers.filter(timer => timer.id !== id),
        activeTimer: (this.state.activeTimer.id == id ? null : this.state.activeTimer)
      })
    }
  }

  clearTimer = () => {
    this.setState({
      timers: [
        ...this.state.timers,
        this.state.activeTimer
      ],
      activeTimer: {
        id: 0,
        color: 'blue'
      }
    })
  }

  handleOnDragEnd = (result) => {
    if (result.destination) {
      const reorderedTimers = Array.from(this.state.timers)
      const [reorderedItem] = reorderedTimers.splice(result.source.index, 1)
      reorderedTimers.splice(result.destination.index, 0, reorderedItem)

      this.setState({timers: reorderedTimers})
    }
  }

  runAutostart = () => {
    this.setState({autostart: true})
  }

  render() {
    const { color } = this.state.activeTimer

    return (
      <div className={`app ${color}`}>
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
