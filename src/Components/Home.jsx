import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

function Home() {

    const navigate = useNavigate()

    const handleLogout = ()=>{
        signOut(auth).then(()=>{
            console.log('success')
            navigate('/login')
        })
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div>
                <h1 className='pb-3 font-bold text-2xl text-center'>7025133315</h1>
                <button onClick={handleLogout} className='btn btn-primary w-96'>Logout</button>
                <hr className='w-96 mt-5 ' />
            </div>
        </div>
    )
}

export default Home
