import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
    const [ stylee , setStyle] = useState()

    const path = window.location.pathname;

    useEffect(() => {
        if (path !== '/' && path !== '/signin' && path !== '/myacc' && path !== '/workouts') {
          console.log(path);
          setStyle(false)
        } else {
          setStyle(true)
        }
      }, [path])

    const [loged, setLoged] = useState()
    async function getData() {
        const response = await fetch('https://myfitnesstrack-server1.onrender.com/api/profile', {
            credentials: 'include'
        })

        const data = await response.json()
        if (data !== 'hello') {
            setLoged(true)
        } else {
            setLoged(false)
        }
    }


    useEffect(() => {
        getData()
    }, [])
    
    return (
        <div id='Navbar' className={stylee ? 'Navbar' : 'disabled'}>
            <a href={loged ? '/myacc' : '/#'} className='logo'>
                <h1>myfitnesstrack</h1>
            </a>
            {
                loged ?
                    <>
                        <ul className='ul'>
                            <NavLink className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            } to={'/workouts'}>workouts</NavLink>
                            <NavLink className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            } to={'/videos'}>videos</NavLink>
                            <NavLink className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            } to={'/myworkouts'}>my workouts</NavLink>
                            <NavLink className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : ""
                            } to={'/myacc'}>my account</NavLink>
                        </ul>
                    </>
                    :
                    <>
                        <Link to={'/signin'}>
                            <button className='btn btn2'>Sign in</button>
                        </Link>
                    </>
            }
        </div>
    )
}

export default Navbar
