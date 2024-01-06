import { useContext } from 'react'
import { WorkoutsContext } from '../context/WorkoutContext'

const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)

  if (!context) {
    throw Error(
      'useWorkoutsContext must be used inside WorkoutsContext Provider'
    )
  }

  return context
}

export default useWorkoutsContext
