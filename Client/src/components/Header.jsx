import React from 'react'
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className='Header'>
            <div className="left">
                <h1>Good health starts with how you live.</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia deleniti consequatur iusto quidem molestias neque natus eveniet et fuga error!</p>
                <Link to={'/signin'}><button className='btn'>Start now</button></Link>
            </div>
            <Spline className='bc' scene="https://prod.spline.design/EwCkYFCGQVkflIkT/scene.splinecode" />
        </div>
    )
}

export default Header
