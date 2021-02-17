import React from 'react';
import TimerCreator from './TimerCreator';
import Schedule from './Schedule';
import '../App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      formTitle: '',
      formTime: 0,
      activeTimers: []
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

  addTimer = (event) => {
    event.preventDefault();
    this.setState({activeTimers: [
      ...this.state.activeTimers,
      {
        id: date.now(),
        title: this.state.formTitle,
        seconds: this.state.formTime
    }]});
    this.clearInputs();
  }

  render() {
    return (
      <>
        <main>
          <TimerCreator
            title={this.state.formTitle}
            time={this.state.formTime}
            updateTitle={this.updateTitle}
            increment={this.incrementTime}
            decrement={this.decrementTime}
            addTimer={this.addTimer}
          />
          <Schedule activeTimers={this.state.activeTimers}/>
        </main>
      </>
    );
  }
}

export default App;
