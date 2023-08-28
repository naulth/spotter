import React, {useContext} from 'react'

import { UserContext } from '../Context/user'

function DeleteWPExercise({workoutId, exerciseId}) {

    const {user, setUser} = useContext(UserContext)

    const handleDelete = (e) => {
        fetch(`/workouts/remove-exercise/${workoutId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exercise_id:exerciseId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            console.log(data.message)

            const updatedUser = {
                ...user,
                workouts: user?.workouts?.map(workout => {
                    if (workout.id === workoutId) {
                        return {
                            ...workout,
                            exercises: workout.exercises.filter(exercise => exercise.id !== exerciseId)
                        }
                    } else {
                        return workout
                    }
                })
            }
            setUser(updatedUser)
        })
        .catch(error => {
            console.error('Error', error)
        })
    }

    return (

        <button onClick={handleDelete} className="hover:bg-sky-950 hover:text-lime-100 text-lime-200 border py-1 border-lime-100 mb-4 shadow font-bold px-2">Remove from Workout</button>

    )

}

export default DeleteWPExercise