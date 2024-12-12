import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Outlet, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../features/authSlice'
import { showAlert } from '../features/alertSlice'

function Home() {

    const navigate = useNavigate()
    const authUser = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (User) => {
            if (User) {
                dispatch(update(true))
            } else {
                dispatch(update(false))
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        dispatch(
            showAlert({
                content: 'Logged out successfully your account! Please Login',
                styling: 'bg-green-700 text-white text-sm',
            })
        );
        signOut(auth).then(() => {
            console.log('success')
            navigate('/login')
        })
    }


    return (
        <div className='flex items-center justify-center h-screen'>

            {authUser ? (
                <div>
                    <h1 className='pb-3 font-bold text-2xl text-center'>User Logged On</h1>
                    <button onClick={handleLogout} className='btn btn-primary w-96'>Logout</button>
                    <hr className='w-96 mt-5 ' />
                </div>
            ) :
                <div>
                    <h1 className='pb-3 font-bold text-2xl text-center'>Go to Login</h1>
                    <Link to={'/login'} ><button className='btn bg-red-700 w-96 text-white hover:bg-red-900'>Login</button></Link>
                    <hr className='w-96 mt-5 ' />
                </div>
            }
            <Outlet />
        </div>
    )
}

export default Home
