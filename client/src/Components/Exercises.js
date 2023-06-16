import React, {useState, useEffect, useContext} from 'react'
import { ExercisesContext } from '../Context/exercises'
import ExerciseCard from './ExerciseCard'

function Exercises() {

    const {exercises, setExercises} = useContext(ExercisesContext)

    useEffect(() => {
        fetch('/exercises')
        .then((res) => {
            if (res.ok) {
                res.json().then((r) => {
                    setExercises(r)
                   
                })
            }
        })
    }, [])

    const categories = [
        "chest",
        "forearms",
        "lats",
        "midback",
        "lowback",
        "quads",
        "hamstrings",
        "calves",
        "triceps",
        "traps",
        "shoulders",
        "abs",
        "glutes",
        "biceps",
        "adductors",
        "abductors"
    ]

    const [checkedItems, setCheckedItems] = useState({})

    const handleCheckboxChange = e => {
        setCheckedItems({...checkedItems, [e.target.name]: e.target.checked })
    }

    const filteredExercises = exercises.filter((exercise) => {
        if(Object.values(checkedItems).every((isChecked) => !isChecked)) {
            return true
        }

        return Object.entries(checkedItems).some(([muscle, isChecked]) => {
            return isChecked && exercise.muscle === muscle
        })
    })

    const exerciseComponents = filteredExercises.map(exercise => <ExerciseCard key={exercise.id} id={exercise.id} name={exercise.name} image={exercise.image} description={exercise.description} muscle={exercise.muscle} />)

    return(
        <div>
            <div>
                <label>
                    <input
                    type="checkbox"
                    name="chest"
                    checked={checkedItems.chest || false}
                    onChange={handleCheckboxChange}
                    />
                    Chest
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="forearms"
                    checked={checkedItems.forearms || false}
                    onChange={handleCheckboxChange}
                    />
                    Forearms
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="lats"
                    checked={checkedItems.lats || false}
                    onChange={handleCheckboxChange}
                    />
                    Lats
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="midback"
                    checked={checkedItems.midback || false}
                    onChange={handleCheckboxChange}
                    />
                    Mid-Back
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="lowback"
                    checked={checkedItems.lowback || false}
                    onChange={handleCheckboxChange}
                    />
                    Low-Back
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="quads"
                    checked={checkedItems.quads || false}
                    onChange={handleCheckboxChange}
                    />
                    Quads
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="hamstrings"
                    checked={checkedItems.hamstrings || false}
                    onChange={handleCheckboxChange}
                    />
                    Hamstrings
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="calves"
                    checked={checkedItems.calves || false}
                    onChange={handleCheckboxChange}
                    />
                    Calves
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="triceps"
                    checked={checkedItems.triceps || false}
                    onChange={handleCheckboxChange}
                    />
                    Triceps
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="traps"
                    checked={checkedItems.traps || false}
                    onChange={handleCheckboxChange}
                    />
                    Traps
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="shoulders"
                    checked={checkedItems.shoulders || false}
                    onChange={handleCheckboxChange}
                    />
                    Shoulders
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="abs"
                    checked={checkedItems.abs || false}
                    onChange={handleCheckboxChange}
                    />
                    Abs
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="glutes"
                    checked={checkedItems.glutes || false}
                    onChange={handleCheckboxChange}
                    />
                    Glutes
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="biceps"
                    checked={checkedItems.biceps || false}
                    onChange={handleCheckboxChange}
                    />
                    Biceps
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="adductors"
                    checked={checkedItems.adductors || false}
                    onChange={handleCheckboxChange}
                    />
                    Adductors
                </label>
                <label>
                    <input
                    type="checkbox"
                    name="abductors"
                    checked={checkedItems.abductors || false}
                    onChange={handleCheckboxChange}
                    />
                    Abductors
                </label>
            </div>

            <div className = " justify-items-center mt-10 grid max-w-8xl grid-cols-4 pb-10 gap-6 ">

                {exerciseComponents}

            </div>
        </div>
    )
}

export default Exercises