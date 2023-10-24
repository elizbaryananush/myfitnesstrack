import React from 'react'
import biking from '../assets/animatedicons/blt.gif'
import progress from '../assets/animatedicons/progress.gif'
import plans from '../assets/animatedicons/plans.gif'


function Services() {
    return (
        <div className='Services'>
            <h1>Services</h1>
            <div className="card-div">
                <div className="card">
                    <img src={biking} alt="hello" />
                    <h1>Goal setting</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi corporis similique in facilis. Officia sequi perspiciatis placeat dicta vero? Nobis.</p>
               <div className="btn btn2">More</div>
               </div>
                <div className="card">
                    <img src={progress} alt="hello" />
                    <h1>Progress Tracking</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi corporis similique in facilis. Officia sequi perspiciatis placeat dicta vero? Nobis.</p>
                <div className="btn btn2">More</div>
                </div>
                <div className="card">
                    <img src={plans} alt="hello" />
                    <h1>workout plans</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi corporis similique in facilis. Officia sequi perspiciatis placeat dicta vero? Nobis.</p>
                <div className="btn btn2">More</div>
                </div>
            </div>
        </div>
    )
}

export default Services