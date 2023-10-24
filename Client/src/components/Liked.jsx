import React, { useEffect, useState } from 'react'

function Liked() {
    const [data, setdata] = useState()
    const [genre, setgenre] = useState('all')

    const getData = async () => {
        const response = await fetch('https://myfitnesstrack-server2.vercel.app/api/liked', {
            method: 'GET',
        })

        const data = await response.json()
        setdata(data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='liked'>
            <div className="main">
                {
                    data ? data.length > 0 ? <div className="btns">
                        <button className={genre === 'all' ? 'active btn3' : 'btn3'} onClick={() => setgenre('all')}>all</button>
                        <button className={genre === 'stretching legs' ? 'active btn3' : 'btn3'} onClick={() => setgenre('stretching legs')}>legs</button>
                        <button className={genre === 'abs' ? 'active btn3' : 'btn3'} onClick={() => setgenre('abs')}>abs</button>
                        <button className={genre === 'push ups' ? 'active btn3' : 'btn3'} onClick={() => setgenre('push ups')}>push ups</button>
                    </div> : null : null
                }
                <div className="grid">
                    {data ? data.length > 0 ? data.map((item, index) => {

                        if (genre == item.genre) {
                            return item ? <div key={index} className='item'>

                                <video autoPlay muted loop>
                                    <source src={item.link} />
                                </video>

                                <p
                                    onClick={() => {
                                        window.location.href = item._id
                                    }}
                                    className='name'>{item.name}
                                </p>

                                <div className="bottom">
                                    <p className='genre'>{item.genre}</p>

                                </div>

                            </ div> : <h1 className='empty'>no liked videos</h1>

                        }
                        else if (genre === 'all') {
                            return <div key={index} className='item'>

                                <video autoPlay muted loop>
                                    <source src={item.link} />
                                </video>

                                <p
                                    onClick={() => {
                                        window.location.href = item._id
                                    }}
                                    className='name'>{item.name}
                                </p>

                                <div className="bottom">
                                    <p className='genre'>{item.genre}</p>
                                </div>

                            </ div>
                        } 
                    }) : <h1 className='empty'>no liked videos</h1> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Liked