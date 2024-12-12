import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Outlet, Link } from 'react-router-dom'

function Home() {

    const navigate = useNavigate()
    const [user, setUser] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (User) => {
            if (User) {
                setUser(true);
            } else {
                setUser(false);
            }
        });
        return () => unsubscribe();
    }, []);

    console.log(user)

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('success')
            navigate('/login')
        })
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div>
                <h1 className='pb-3 font-bold text-2xl text-center'>7025133315</h1>
                {user ? (
                    <button onClick={handleLogout} className='btn btn-primary w-96'>Logout</button>
                ) : (
                    <Link to={'/login'} ><button className='btn btn-success w-96'>Login</button></Link>
                )}

                <hr className='w-96 mt-5 ' />
            </div>
            <Outlet />
        </div>
    )
}

export default Home
