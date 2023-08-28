import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'

import { UserContext } from '../Context/user'

function SplitPage(){

    const {user} = useContext(UserContext)

    const params = useParams()
    const id = parseInt(params.splitId)

    const [theSplit, setTheSplit] = useState(null)

    useEffect(()=> {
        const filteredSplit = user?.splits?.find((split) => split.id === id)
        setTheSplit(filteredSplit)
    },[user, id])
    
    console.log(theSplit)

    return(

        <h1>{theSplit?.name}</h1>

    )
}

export default SplitPage