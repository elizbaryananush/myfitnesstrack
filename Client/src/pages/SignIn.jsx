import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userActions } from '../redux/userSlice'

function SignIn() {
    const [style, setStyle] = useState(true)
    const [form1, setForm] = useState(1)
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState()
    const [password, setPassword] = useState('')
    const [goal, setGoal] = useState('Lose weight')
    const [age, setage] = useState(17)
    const [height, setHeight] = useState(17)
    const [link, setLink] = useState()
    const loged = true;

    async function register(e) {
        e.preventDefault()
        const response = await fetch('https://myfitnesstrack-server1.vercel.app/api/register', {
            body: JSON.stringify({
                username,
                password,
                fullname,
                email, 
                goal,
                age,
                height,
            }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })

        const data = await response.json()

        if (data.status === 'ok') {
            alert('successful')
            window.location.href = '/signin'
            setStyle(false)
        } else {
            alert('this email/username already used by another user , please try another')
        }
    }

    async function login(e) {
        e.preventDefault()

        const response = await fetch('https://myfitnesstrack-server1.vercel.app/api/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        const data = await response.json()

        if (data === 'ok') {
            alert('youre loged in')
            window.location.href = '/myacc'
        } else {
            alert(data)
        }
    }

    return (
        <div className='SignIn'>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>

            {/* {first page} */}

            <div className='form signup1' style={form1 === 1 && style === true ? { display: 'grid' } : { display: 'none' }}>
                <h1>Sign Up</h1>

                <div className='input'>
                    <input
                        required
                        type="text"
                        placeholder='Full Name'
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>

                <div className='input'>
                    <input
                        required type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className='input'>
                    <input
                        required
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='input'>
                    <input
                        required
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <p>have an account ? <a onClick={() => setStyle(false)} className='visit'>sign in</a></p>

                <button disabled={!password || !email || !username || !fullname} onClick={() => setForm(2)} className="btn" id='submit1'>Next</button>
            </div>

            {/* page 2 */}

            <form onSubmit={register} action='myacc' className='form signup2' style={form1 === 2 ? { display: 'grid' } : { display: 'none' }}>
                <h1>Sign Up</h1>
                <div className='input'>
                    <select className='input' id="" required>
                        <option onClick={(e) => setGoal(e.target.value)} value={'Lose weight'}>Lose weight</option>
                        <option onClick={(e) => setGoal(e.target.value)} value={'Maintain weight'}>Maintain weight</option>
                        <option onClick={(e) => setGoal(e.target.value)} value={'Gain weight'}>Gain weight</option>
                        <option onClick={(e) => setGoal(e.target.value)} value={'Modify my diet'}>Modify my diet</option>
                    </select>
                </div>

                <div className='input'>
                    <input value={age} onChange={(e) => setage(e.target.value)} required type="number" placeholder='Age' />
                </div>

                <div className='input'>
                    <input value={height} onChange={(e) => setHeight(e.target.value)} required type="number" placeholder='height' />
                </div>

                <div className='buttons'>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setForm(1)
                    }} className="btn">Back</button>
                    <input type="submit" readOnly className='btn' value="Sign Up" />
                </div>

            </form>

            <form onSubmit={login} action={link} className='form' style={!style ? { display: 'grid' } : { display: 'none' }}>
                <h1>Sign In</h1>

                <div className='input'>
                    <input onChange={(e) => setUsername(e.target.value)} value={username} required type="text" placeholder='Username' />
                </div>

                <div className='input'>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} required type="text" placeholder='Password' />
                </div>

                <p>dont have an account ? <a onClick={() => setStyle(true)} className='visit'>sign up</a></p>

                <input type='submit' className="btn" value='Sign In' />
            </form>
        </div>
    )
}

export default SignIn