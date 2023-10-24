import React, { useEffect, useState } from 'react'

function Post() {
    const [link, setLink] = useState()
    const [name, setName] = useState()
    const [author, setAuthor] = useState()
    const [date, setDate] = useState()
    const [genre, setGenre] = useState()
    const [overview, setOverview] = useState()

    async function send(e) {
        e.preventDefault()
        const response = await fetch('http://localhost:8000/api/workouts', {
            method: 'POST',
            body: JSON.stringify({
                link: link,
                name: name,
                // author: author,
                // date: date,
                genre: genre,
                // overview: overview
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        const data = await response.json()

        console.log(data);

        setLink('')
        setName('')
        // setAuthor('')
        // setDate('')
        // setGenre('')
        // setOverview('')
    }

    return (
        <div>
            <form className='send' onSubmit={send}>
                <input type="text" placeholder='link' onChange={(e) => setLink(e.target.value)} value={link} />
                <input type="text" placeholder='name' onChange={(e) => setName(e.target.value)} value={name} />
                {/* <input type="text" placeholder='author' onChange={(e) => setAuthor(e.target.value)} value={author} /> */}
                {/* <input type="text" placeholder='date' onChange={(e) => setDate(e.target.value)} value={date} /> */}
                <input type="text" placeholder='genre' onChange={(e) => setGenre(e.target.value)} value={genre} />
                {/* <input type="text" placeholder='overview' onChange={(e) => setOverview(e.target.value)} value={overview} /> */}
                <input type="submit" value='send' />
            </form>
        </div>
    )
}

export default Post;