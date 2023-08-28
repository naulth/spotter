import React from 'react'
import {Outlet, Link} from 'react-router-dom'

import DeleteWPExercise from './DeleteWPExercise'


function WPExercise({id, name, workoutId, image}) {

    const linkURL = `/exercises/${id}`

    return(

        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <img src={image} alt={name} className='rounded-t-lg w-full max-h-60'/>
            <div className="px-2">
                <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{name}</h1>
            </div>
            <button className="hover:bg-zinc-800 hover:text-lime-100 text-lime-200 border mt-4 border-lime-100 shadow font-bold px-4 rounded mx-2">
                    <Link to={linkURL}>View Exercise</Link> 
            </button>
            <DeleteWPExercise exerciseId={id} workoutId={workoutId}/>
            <Outlet />
        </div>

    )

}

export default WPExercise