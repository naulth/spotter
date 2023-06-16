import React, {useState} from 'react'

const ExerciseContext = React.createContext()

function ExerciseProvider({children}) {

    const [exercise, setExercise] = useState({})

    return <ExerciseContext.Provider value={{exercise, setExercise}}>{children}</ExerciseContext.Provider>
}

export {ExerciseContext, ExerciseProvider}