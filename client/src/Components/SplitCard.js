import React from 'react'

function SplitCard({id, name, days, duration}) {

    return (

        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className="px-2">
                <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{name}</h1>
            </div>
            <p className="text-white">To be completed over {days} days.</p>
            <p className="text-white">{duration} Weeks</p>
        </div>

    )
}

export default SplitCard