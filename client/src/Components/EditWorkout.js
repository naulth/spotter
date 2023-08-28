import React, {useState, useContext} from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'

import { UserContext } from '../Context/user'

function EditWorkout({workoutId}){

    const {user, setUser} = useContext(UserContext)

    const [showEditWorkout, setShowEditWorkout] = useState(false)

    const toggleEditWorkout = () => {
        setShowEditWorkout(!showEditWorkout)
    }

    const editWorkoutState = (values) => {

        const changedWorkout = {
            name: values.name,
            id: values.id,
            user_id: values.user_id,
            exercises: user.workouts.find(workout => workout.id === values.id).exercises,
        }

        const newUser = {
            ...user,
            workouts: [
                ...user?.workouts?.map(workout => {
                    if(workout.id === changedWorkout.id) {
                        return changedWorkout
                    } else {
                        return workout
                    }
                })
            ]
        }
        setUser(newUser)
    }

    const formSchema = yup.object().shape({
        name: yup
        .string()
        .required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            id: workoutId,
            user_id: user?.id
        },
        enableReinitialize: true,
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/workouts/${workoutId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            editWorkoutState(values)

            toggleEditWorkout()

        }
    })

    return(

        <div>
            <button onClick={toggleEditWorkout} className="bg-zinc-900 hover:text-lime-200 text-sm w-20 text-lime-200 border border-lime-200 shadow font-bold py-1 px-4 my-1">Edit</button>

            {showEditWorkout &&
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-50 flex justify-center items-center">
                <div className="max-w-2xl py-20 mx-auto border border-lime-100 shadow-lg p-8 my-16 bg-zinc-900">
                    <div>
                        <h2 className="text-3xl text-center pb-4 px-4 font-bold tracking-tight text-lime-300">Edit Workout</h2>
                    </div>
                    <div>
                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <div className="">
                                <label className="block text-left text-sm font-medium leading-6 text-lime-200">Name: </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="flex mt-6 ">
                                    <button type="submit"className=" border border-lime-300 flex mt-2 mx-2 justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm  leading-6 text-lime-300  font-bold shadow-sm hover:bg-lime-200 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">Edit Workout</button>
                                    <button onClick={toggleEditWorkout} className=" border border-lime-300 flex mt-2 mx-2 justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm  leading-6 text-lime-300  font-bold shadow-sm hover:bg-lime-200 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">Close Form</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            }
        </div>

    )

}

export default EditWorkout