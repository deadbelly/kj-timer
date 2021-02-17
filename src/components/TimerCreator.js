import React from 'react';

const TimerCreator = ({title, time, updateTitle, increment, decrement, addTimer}) => {

  return (
    <form>
      <input
        name='title'
        type='text'
        value={title}
        onChange={updateTitle}
      />
      <h2>{time}</h2>
      <div className="time-control">
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
      </div>
      <button onClick={addTimer}>ADD TIMER</button>
    </form>
  );
}

export default TimerCreator
