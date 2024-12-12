import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const uid = localStorage.getItem('uid')
    const navigate = useNavigate()

    console.log(uid)

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
            .max(30, "First Name cannot exceed 30 characters")
            .required("First Name is required"),
        lastName: Yup.string()
            .matches(/^[a-zA-Z]+$/, "Only alphabets are allowed")
            .max(30, "Last Name cannot exceed 30 characters")
            .required("Last Name is required"),
        email: Yup.string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Invalid email address'
            )
            .required('Email is required'),
    });

    const handleSubmit = async (values) => {

        if (uid) {
            const userRef = doc(db, 'users', uid)
            await updateDoc(userRef, values).then(() => {
                localStorage.removeItem('uid')
                navigate('/')
            })
        } else {
            navigate('/login')
        }

    }


    return (
        <div className="m-auto p-10 min-h-screen">
            <div className='grid md:grid-cols-2'>
                <div className='flex justify-center pb-5'>
                    <div className="carousel rounded-box w-96">
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                                className="w-full"
                                alt="Tailwind CSS Carousel component" />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                                className="w-full"
                                alt="Tailwind CSS Carousel component" />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                                className="w-full"
                                alt="Tailwind CSS Carousel component" />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                                className="w-full"
                                alt="Tailwind CSS Carousel component" />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                                className="w-full"
                                alt="Tailwind CSS Carousel component" />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                                className="w-full"
                                alt="Tailwind CSS Carousel component" />
                        </div>
                        <div className="carousel-item w-full">
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                                className="w-full"
                                alt="Tailwind CSS Carousel component" />
                        </div>
                    </div>
                </div>

                <div className='px-10 pb-5'>
                    <div className="flex justify-end">
                        <img className='w-14' src="icon.png" alt="" />
                    </div>
                    <h1 className='font-bold pt-12 font-sans text-2xl'>Sign up</h1>
                    <p className='font-sans text-slate-600 pt-2 pb-6 text-sm'>Let’s get you all st up so you can access your personal account.</p>
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>

                        {({ isSubmitting }) => (

                            <Form action="">
                                <div className='grid md:grid-cols-2'>
                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text absolute mt-4 ms-4 px-2 bg-white">First Name</span>
                                        </label>
                                        <Field
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="input input-bordered border-black"
                                        />
                                        <ErrorMessage
                                            name="firstName"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    <div className="form-control mt-3 md:mt-0 md:ps-3 relative">
                                        <label className="label">
                                            <span className="label-text absolute mt-4 ms-4 px-2 bg-white">Last Name</span>
                                        </label>
                                        <Field
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            className="input input-bordered border-black" />
                                        <ErrorMessage
                                            name="lastName"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                </div>
                                <div className="form-control mt-2 relative">
                                    <label className="label ">
                                        <span className="label-text absolute mt-4 ms-4 px-2 bg-white">email</span>
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="input input-bordered border-black" />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                                <p className='mt-3 text-sm'><span className='pe-2'><input type="checkbox" className="checkbox-xs" required /></span>I agree to all the <span className='text-red-600'>Terms</span> and <span className='text-red-600'>Privacy Policies</span></p>

                                <button type='submit' disabled={isSubmitting} className='btn bg-blue-700 w-full mt-5 text-white hover:bg-blue-900' >Create account</button>
                            </Form>
                        )}
                    </Formik>
                    <p className='text-center font-sans text-sm pt-3'>Already have an account? <span className='text-error hover:link'>Login</span></p>
                </div>

            </div>
        </div>

    )
}

export default Signup
