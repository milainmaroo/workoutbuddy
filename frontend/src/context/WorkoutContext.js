import React, { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext(null)

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload,
      }
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      }
    case 'UPDATE_WORKOUT':
      // return {
      //   workouts: state.workouts.map((workout) =>
      //     workout._id === action.payload._id ? action.payload : state
      //   ),
      // }
      const updatedIndex = state.workouts.findIndex(
        (workout) => workout._id === action.payload._id
      )

      if (updatedIndex !== -1) {
        const updatedWorkouts = [...state.workouts]
        updatedWorkouts[updatedIndex] = action.payload
        return {
          workouts: updatedWorkouts,
        }
      } else {
        return state
      }
    default:
      return state
  }
}

const WorkoutsContextProvider = (props) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  })

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </WorkoutsContext.Provider>
  )
}

export default WorkoutsContextProvider
