import React, { useEffect } from 'react'
import { useContext } from 'react'
import { WorkoutsContext } from '../context/WorkoutContext'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const { workouts, setWorkouts } = useContext(WorkoutsContext)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts')
        const json = await response.json()
        if (response.ok) {
          setWorkouts(json)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchWorkouts()
  })

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
