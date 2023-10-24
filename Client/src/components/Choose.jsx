import React from 'react'
import image from '../assets/images/gym.jpg'
import image2 from '../assets/images/gym2.jpg'
import image3 from '../assets/images/gym3.jpg'
import { Link } from 'react-router-dom'

function Choose() {
    
    return (
        <div className='choose'>
            <h1>Why Choose us</h1>
            <div className="grid-container">
                <Link class="grid-item item1" to={'/signin'}>
                    {/* <div> */}
                    <div className='bg'>
                        <p>1300+ workout videos</p>
                    </div>
                    <img src={image} alt="" />
                    {/* </div> */}
                </Link>
                <Link class="grid-item item2" to={'/signin'}>
                    {/* <div> */}
                    <div className='bg'>
                        <p>recomendations professional</p>
                    </div>
                    <img src={image2} alt="" />
                    {/* </div> */}
                </Link>
                <Link class="grid-item item3" to={'/signin'}>
                    {/* <div> */}
                        <div className='bg'>
                            <p>All for free</p>
                        </div>
                        <img src={image3} alt="" />
                    {/* </div> */}
                </Link>
            </div>
        </div>
    )
}

export default Choose