import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { showAlert } from '../features/alertSlice';


function VerifyCodePage() {

    const confirmation = useSelector((state) => state.confirmation)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!confirmation) {
            dispatch(
                showAlert({
                    content: 'Error occurred. Reenter number for OTP.',
                    styling: 'bg-red-600 text-white text-sm',
                })
            );
            navigate('/login')
        }
    }, [])

    const validationSchema = Yup.object({
        otp: Yup.string()
            .matches(/^\d{6}$/, "OTP must be a 6-digit number")
            .required("OTP is required"),
    });

    const handleSubmit = ({ otp }) => {
        setLoading(true)
        try {
            if (confirmation) {
                confirmation.confirm(otp).then(async (userCredential) => {
                    console.log(userCredential);

                    const user = userCredential.user
                    const userRef = doc(db, 'users', user.uid); 
                    const userSnapshot = await getDoc(userRef);

                    if (!userSnapshot.exists()) {
                        await setDoc(userRef, {
                            uid: user.uid,
                        })
                        localStorage.setItem('uid', user.uid)
                        dispatch(
                            showAlert({
                                content: 'OTP verification successful. Please register your account.',
                                styling: 'bg-green-600 text-white text-sm',
                            })
                        );
                        navigate("/signup");

                    } else {
                        const data = userSnapshot.data()
                        if ("email" in data) {
                            dispatch(
                                showAlert({
                                    content: 'Verification successful. Your account is logged in.',
                                    styling: 'bg-green-600 text-white text-sm',
                                })
                            );
                            navigate("/");
                        } else {
                            localStorage.setItem('uid', data.uid)
                            dispatch(
                                showAlert({
                                    content: 'OTP verification successful. Please register your account.',
                                    styling: 'bg-green-600 text-white text-sm',
                                })
                            );
                            navigate("/signup");
                        }
                    }

                }).catch((error) => {
                    if (error.code === 'auth/invalid-verification-code') {
                        setLoading(false)
                        dispatch(
                            showAlert({
                                content: 'Invalid OTP!. Please try again.',
                                styling: 'bg-red-600 text-white text-sm',
                            })
                        );
                    } else {
                        dispatch(
                            showAlert({
                                content: 'Error during OTP verification.',
                                styling: 'bg-red-600 text-white text-sm',
                            })
                        );
                    }
                })
            } else {
                navigate('/login')
            }
        } catch (error) {
            console.error("Error verifying OTP:", error.message);
        }
    }



    return (
        <div>
            <div className="m-auto p-10 min-h-screen">
                <div className='grid md:grid-cols-2'>
                    <div className='px-10 py-4'>
                        <img className='w-14' src="icon.png" alt="" />
                        <h3 className=' pt-14 font-semibold text-sm flex pb-4'><span className='flex pt-1 text-sm text-blue-800'>< IoIosArrowBack /></span>Back to Login</h3>
                        <h1 className='font-bold font-sans text-xl'>Verify Code</h1>
                        <p className='font-sans text-slate-600 pt-2 pb-6 text-sm'>An OTP has been sent to your registered email</p>

                        <Formik
                            initialValues={{ otp: "" }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >

                            {({ isSubmitting }) => (
                                <Form action="">
                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text absolute mt-3 ms-4 p-2 bg-white">Enter code</span>
                                        </label>
                                        <Field
                                            type="text"
                                            id="otp"
                                            name="otp"
                                            className="input input-bordered border-black" />
                                        <ErrorMessage
                                            name="otp"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>

                                    <p className=' font-sans text-sm pt-3'>Didn't receive a code? <span className='text-error hover:link'>Resend</span></p>
                                    <button type='submit' className='btn bg-blue-700 w-full mt-5 text-white hover:bg-blue-900' >{loading && <span className="loading loading-dots loading-lg" />}Verify</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className='flex justify-center'>
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

                </div>
            </div>
        </div>
    )
}

export default VerifyCodePage
