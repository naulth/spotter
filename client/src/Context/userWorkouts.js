import React, {useState} from 'react'

const UserWorkoutsContext = React.createContext()

function UserWorkoutsProvider({children}) {

    const [userWorkouts, setUserWorkouts] = useState({})

    return <UserWorkoutsContext.Provider value={{userWorkouts, setUserWorkouts}}>{children}</UserWorkoutsContext.Provider>
}

export {UserWorkoutsContext, UserWorkoutsProvider}