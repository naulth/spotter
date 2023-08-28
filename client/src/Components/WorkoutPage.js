import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'

import { UserContext } from '../Context/user'
import WPExercise from './WPExercise'
import EditWorkout from './EditWorkout'
import DeleteWorkout from './DeleteWorkout'

function WorkoutPage(){

    const {user} = useContext(UserContext)

    const params = useParams()
    const id = parseInt(params.workoutId)

    const [theWorkout, setTheWorkout] = useState(null)

    useEffect(()=> {
        const filteredWorkout = user?.workouts?.find((workout) => workout.id === id)
        setTheWorkout(filteredWorkout)
    },[user, id])

    const theWorkoutExercises = theWorkout?.exercises?.map(exercise => <WPExercise key={exercise.id} workoutId={theWorkout.id} id={exercise.id} name={exercise.name} image={exercise.image} />)
    

    return(
        <div>
            <div>
                <h1>{theWorkout?.name}</h1>
                <button><Link>Add Exercise</Link></button>
                <EditWorkout workoutId={id} />
                <DeleteWorkout workoutId={id}/>
            </div>
            <div>
                {theWorkoutExercises}
            </div>
        </div>

    )
}

export default WorkoutPage