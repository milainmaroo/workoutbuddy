import React from 'react'
import useWorkoutsContext from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { setWorkouts, setEditWorkoutData } = useWorkoutsContext()

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/workouts/' + workout._id, {
        method: 'DELETE',
      })
      if (response.ok) {
        const response = await fetch('/api/workouts')
        const json = await response.json()
        setWorkouts(json)
      }
    } catch (error) {
      console.log(error)
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
          onClick={() => {
            setEditWorkoutData(workout)
          }}
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
