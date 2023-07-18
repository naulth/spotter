import React from 'react'



function WorkoutCard({id, name}) {

    return (

        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className="px-2">
                <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{name}</h1>
            </div>
            
            {/* <button className="text-white">Add an Exercise</button> */}
        </div>

    )
}

export default WorkoutCard