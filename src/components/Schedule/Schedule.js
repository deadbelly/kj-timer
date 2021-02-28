import React, { useState } from 'react';
import QueuedTimer from '../QueuedTimer/QueuedTimer'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Schedule.scss'

const Schedule = ({timers, removeTimer, addTimer, handleOnDragEnd}) => {
  const queue = timers.map((timer, index) => {
    return (
      <Draggable
        key={timer.id}
        draggableId={timer.id.toString()}
        index={index}
      >
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <QueuedTimer
              timer={timer}
              copyTimer={addTimer}
              removeTimer={removeTimer}
            />
          </div>
        )}
      </Draggable>
    )
  })

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="timers">
        {(provided) => (
          <ul
            className='schedule'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {queue}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Schedule
