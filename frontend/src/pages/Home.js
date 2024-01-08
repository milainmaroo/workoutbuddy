import React, { useEffect } from 'react'
import useWorkoutsContext from '../hooks/useWorkoutsContext'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  console.log(workouts)

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json() // array of objects data

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutDetails key={workout._id} workout={workout} />
          })}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
