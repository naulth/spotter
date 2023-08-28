import React from 'react'
import {Outlet, Link} from 'react-router-dom'

function SplitCard({id, name, days, duration}) {

    const linkURL = `/splits/${id}`

    return (

        <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className="px-2">
                <h1 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{name}</h1>
            </div>
            <div>
                <button className="text-center bg-gray-800 hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-2 rounded my-1">
                    <Link to={linkURL}>View Split</Link>
                </button>
                <Outlet />
            </div>
        </div>

    )
}

export default SplitCard