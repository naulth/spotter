import React, {useContext} from 'react'
import AddWorkout from "./AddWorkout"
import AddSplit from "./AddSplit"
import WorkoutCard from "./WorkoutCard"
import SplitCard from './SplitCard'
import { UserContext } from "../Context/user"



function Profile() {

    const {user} = useContext(UserContext)

    const userSplits = user?.splits?.map(split => <SplitCard key={split.id} id={split.id} name={split.name} days={split.days} duration={split.duration} />)

    const userWorkouts = user?.workouts?.map(workout => <WorkoutCard key={workout.id} id={workout.id} name={workout.name} exercises={workout.exercises} />)


    return(
        <div>
            <div>
                <h1>Your Workouts</h1>
                {userWorkouts}
                <AddWorkout />
            </div>
            <div>
                <h1>Your Splits</h1>
                {userSplits}
                <AddSplit />
            </div>
        </div>

    )
}

export default Profile