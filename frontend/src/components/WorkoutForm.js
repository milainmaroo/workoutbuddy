import React, { useState, useEffect } from 'react'
import useWorkoutsContext from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
  const { editWorkoutData, setWorkouts, setEditWorkoutData } =
    useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')

  useEffect(() => {
    if (editWorkoutData) {
      setTitle(editWorkoutData.title)
      setLoad(editWorkoutData.load)
      setReps(editWorkoutData.reps)
    } else {
      setTitle('')
      setLoad('')
      setReps('')
    }
  }, [editWorkoutData])

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const resetForm = () => {
    setTitle('')
    setLoad('')
    setReps('')
    setError(null)
    setEmptyFields([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const workout = { title, load, reps }
      if (editWorkoutData) {
        const response = await fetch(`/api/workouts/${editWorkoutData._id}`, {
          method: 'PATCH',
          body: JSON.stringify(workout),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          resetForm()
          setEditWorkoutData(null)
          const response = await fetch('/api/workouts')
          const json = await response.json() // array of objects data
          if (response.ok) {
            setWorkouts(json)
          }
        }
      } else {
        const response = await fetch('/api/workouts', {
          method: 'POST',
          body: JSON.stringify(workout),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const json = await response.json()
        if (!response.ok) {
          setError(json.error)
          setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
          resetForm()
          const response = await fetch('/api/workouts')
          const json = await response.json() // array of objects data
          if (response.ok) {
            setWorkouts(json)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
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

      <button type='submit'>
        {editWorkoutData ? 'Edit Workout' : 'Add Workout'}
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm
