import React, { createContext, useState } from 'react'

export const WorkoutsContext = createContext(null)

const WorkoutsContextProvider = (props) => {
  const [workouts, setWorkouts] = useState([])
  const [editWorkoutData, setEditWorkoutData] = useState(null)

  return (
    <WorkoutsContext.Provider
      value={{ editWorkoutData, setEditWorkoutData, workouts, setWorkouts }}
    >
      {props.children}
    </WorkoutsContext.Provider>
  )
}

export default WorkoutsContextProvider
