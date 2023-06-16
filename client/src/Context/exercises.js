import React, {useState} from 'react'

const ExercisesContext = React.createContext()

function ExercisesProvider({children}) {

    const [exercises, setExercises] = useState([])

    return <ExercisesContext.Provider value={{exercises, setExercises}}>{children}</ExercisesContext.Provider>
}

export {ExercisesContext, ExercisesProvider}