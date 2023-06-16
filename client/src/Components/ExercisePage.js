import {Link, useParams} from 'react-router-dom'
import {useState, useEffect, useContext} from "react"

import {UserContext} from "../Context/user"
import { ExerciseContext } from '../Context/exercise'

function ExercisePage() {

    const {user, setUser} = useContext(UserContext)
    const {exercise, setExercise} = useContext(ExerciseContext)

    const params = useParams()

    const id = params.exerciseId

    useEffect(() => {
        fetch(`/exercises/${id}`)
        .then((res) => {
            if (res.ok) {
                res.json().then((r) => {
                    setExercise(r)
                })
            } else {
                console.log('Exercise not fetched ok.')
            }
        })
    },[])

    return(
        <div className="h-fit text-center bg-gray-800 min-h-screen">
            <h1 className="text-6xl text-white py-10">{exercise.name}</h1>
            <img className="h-72 mx-auto" src={exercise.image}/>
            <p className="w-1/2 py-10 text-white mx-auto">{exercise.description}</p>
        </div>

    )
}

export default ExercisePage