import React, { useState } from 'react';
import QueuedTimer from './QueuedTimer'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Schedule = ({timers, removeTimer, handleOnDragEnd}) => {
  const queue = timers.map((timer, index) => {
    return (
      <Draggable
        key={timer.id}
        draggableId={timer.id.toString()}
        index={index}
      >
        {(provided) => (
          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <QueuedTimer
              timer={timer}
              removeTimer={removeTimer}
            />
          </li>
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
