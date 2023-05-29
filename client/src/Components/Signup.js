import React, {useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useFormik} from "formik"
import * as yup from "yup"
import {useNavigate} from 'react-router-dom'

function Signup(){

    const [showPassword, setShowPassword] = useState(false)


    const handleShow = () => {
        setShowPassword(!showPassword)
    }

  

    const formSchema = yup.object().shape({
        username: yup
        .string()
        .min(5, 'Username must include at least 5 characters.')
        .required('Required'),
        password: yup
        .string()
        .required('Required')
        .min(8, 'Password must include at least 8 characters.')
        .matches(/[0-9]/, 'Password requires a number.')
        .matches(/[a-z]/, 'Password requires a lowercase letter.')
        .matches(/[A-Z]/, 'Password requires an uppercase letter.')
        .matches(/[^\w]/, 'Password requires a symbol.'),
        confirm: yup
        .string()
        .required('Required')
        .oneOf([yup.ref('password'), null], 'Must match "Password" value'),
        first_name: yup
        .string()
        .required('Required'),
        last_name: yup
        .string()
        .required('Required'),
        birthDate: yup
        .date()
        .max(new Date(Date.now() - 567648000000), "You must be at least 18 years old to sign up.")
        .required('Required')
    })

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
        username: "",
        password: "",
        confirm: "",
        first_name: "",
        last_name: "",
        birthDate: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((r) => {
                if (r.ok) {
                    navigate('/')
                }
            })
        },
    });



    return(
        <div className="flex h-screen">
        <div className="m-auto w-2/5">
            <div className="text-center">
                <h2 className="my-10 text-center text-4xl font-bold leading-9 tracking-tight text-slate-500">Create Your New Account</h2>
                <p className="block text-md font-medium leading-6 text-slate-500">Please ensure all fields are complete and valid.</p>
            </div>
            <div>
            <div className="pt-8">
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-slate-500">Username</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md bg-white border-1 px-4 py-1.5 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.username}</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-slate-500">Date of Birth</label>
                        <div className="mt-2">
                            <input
                                type="date"
                                name="birthDate"
                                value={formik.values.birthDate}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md border-1 bg-white px-4 py-1.5 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.birthDate}</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-slate-500">First Name</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="first_name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md border-1 bg-white px-4 py-1.5 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.first_name}</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-slate-500">Last Name</label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="last_name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md border-0 bg-white px-4 py-1.5 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.last_name}</p>
                        </div>
                    </div>
                    
                    
                    
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-slate-500">Password</label>
                        <div className="z-0 relative w-full">
                            <div className="absolute inset-y-2 right-0 items-center px-2">
                                <input className="hidden js-password-toggle" id="toggle" type="checkbox" />
                                <span className="z-auto ">
                                    {showPassword ? <FontAwesomeIcon icon="fa-solid fa-eye" onClick={handleShow}/> :  <FontAwesomeIcon icon="fa-solid fa-eye-slash" onClick={handleShow}/>
                                    }
                                </span>
                            </div>
                            <div className="mt-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md bg-white border-1 py-1.5 px-4 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.password}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-medium leading-6 text-slate-500">Confirm Password</label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="confirm"
                                value={formik.values.confirm}
                                onChange={formik.handleChange}
                                className="block w-full rounded-md border-1 bg-white py-1.5 px-4 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6"
                            />
                            <p className="formikReqs"> {formik.errors.confirm}</p>
                        </div>
                    </div>
                    <input
                        type="submit"
                        name="submit"
                        className="col-span-4 w-1/2 h-9 justify-center rounded-md bg-slate-500 mt-8 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-slate-600 hover:text-white"
                    />
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Signup