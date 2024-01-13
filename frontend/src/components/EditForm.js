import React, { useState, useEffect } from 'react'
import useWorkoutsContext from '../hooks/useWorkoutsContext'

const EditForm = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const [updatedWorkout, setUpdatedWorkout] = useState({})
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleUpdate = async () => {
    const updatedWorkout = { title: 'Lifts', load: '45', reps: '40' }

    const response = await fetch('/api/workouts/' + workout._id, {
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

  return (
    <form className='create' onSubmit={handleUpdate}>
      <h3>Edit Workout</h3>
      <label>Exercise Title:</label>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Load (in Kg):</label>
      <input
        type='number'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <label>Reps:</label>
      <input
        type='number'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Edit Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default EditForm
