import React, {useState, useContext} from 'react'
import { UserContext } from '../Context/user'
import {useFormik} from 'formik'
import * as yup from 'yup'

function AddSplit() {

    const {user, setUser} = useContext(UserContext)

    const formSchema = yup.object().shape({
        name: yup
        .string()
        .required('Required'),
        days: yup
        .number()
        .min(1, 'A split must range between 1 and 6 days.')
        .max(6, 'A split must range between 1 and 6 days.')
        .required('Required'),
        duration: yup
        .number()
        .min(4, 'Duration must be between 4 and 16 weeks.')
        .max(16, 'Duration must be between 4 and 16 weeks.')
        .required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            user_id: user?.id,
            name: "",
            days: "",
            duration: ""
        },
        enableReinitialize: true,
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/splits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((response) => {
                        const newUser= {
                            ...user,
                            splits: [
                                ...user?.splits, response
                            ]
                        }
                        setUser(newUser)
                    })
                }
            })
            toggleAddSplit()
        }
    })

    const [showAddSplit, setShowAddSplit] = useState(false)

    const toggleAddSplit = () => {
        setShowAddSplit(!showAddSplit)
    }

    return(

        <div>
			<button onClick={toggleAddSplit} className="text-center bg-gray-800 hover:bg-sky-950 hover:text-lime-200 text-sm w-36 text-lime-200 border border-lime-200 shadow font-bold py-1 px-2 rounded my-1">Add a Split</button>
		{showAddSplit &&
        <div className="fixed top-0 left-0 w-full h-full bg-zinc-900 bg-opacity-50 flex justify-center items-center">
			<div className="max-w-2xl py-20 mx-auto border border-lime-100 shadow-lg p-8 my-16 bg-zinc-900">
            <div>
                <h2 className="text-3xl pb-4 px-4 font-bold tracking-tight text-lime-300">Add a Split</h2>
            </div>
			<div>
				<form className="space-y-6" onSubmit={formik.handleSubmit}>
					<div className="">
						<label className="block text-sm font-medium leading-6 text-lime-200">Name: </label>
						<div className="mt-2 pb-2">
							<input
								type="text"
								name="name"
								value={formik.values.name}
                                onChange={formik.handleChange}
								className="block w-full bg-lime-100 rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<p className="formikReqs"> {formik.errors.name}</p>
						</div>
                        <label className="block text-sm font-medium leading-6 text-lime-200">Length of Split in Days: </label>
						<div className="mt-2">
							<input
								type="number"
								name="days"
								value={formik.values.days}
                                onChange={formik.handleChange}
								className="block bg-lime-100 w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<p className="formikReqs"> {formik.errors.days}</p>
						</div>
						<label className="block text-sm font-medium leading-6 text-lime-200">Duration in Weeks: </label>
						<div className="mt-2">
							<input
								type="number"
								name="duration"
								value={formik.values.duration}
                                onChange={formik.handleChange}
								className="block bg-lime-100 w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<p className="formikReqs"> {formik.errors.duration}</p>
						</div>
						<div className="flex mt-6">
                            <button type="submit"className=" border border-lime-300 flex mt-2 mx-2 justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm  leading-6 text-lime-300  font-bold shadow-sm hover:bg-lime-200 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">Add Split</button>
                            <button onClick={toggleAddSplit} className=" border border-lime-300 flex mt-2 mx-2 justify-center rounded-md bg-zinc-800 px-3 py-1.5 text-sm  leading-6 text-lime-300  font-bold shadow-sm hover:bg-lime-200 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200">Close Form</button>
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

export default AddSplit