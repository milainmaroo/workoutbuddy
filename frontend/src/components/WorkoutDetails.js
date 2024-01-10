import React, { useState, useEffect } from 'react'
import useWorkoutsContext from '../hooks/useWorkoutsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const [updatedWorkout, setUpdatedWorkout] = useState({})
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')

  const handleUpdate = async () => {
    const updatedWorkout = { title, load, reps }

    const response = await fetch('/api/workouts/' + updatedWorkout._id, {
      method: 'PATCH',
      body: JSON.stringify(updatedWorkout),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'UPDATE_WORKOUT', payload: json })
    }
  }

  const handleDelete = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  return (
    <div className='workout-details'>
      <div className='workout-info'>
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      <div className='workout-btns'>
        <p
          className='material-symbols-outlined'
          onClick={() => handleUpdate(workout)}
        >
          edit
        </p>
        <p className='material-symbols-outlined' onClick={handleDelete}>
          delete
        </p>
      </div>
    </div>
  )
}

export default WorkoutDetails
