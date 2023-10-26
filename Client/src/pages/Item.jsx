import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useReducer, useState } from 'react'
import { fetchData, postsActions } from '../redux/videoSlice';
import { useParams } from 'react-router-dom';

function Item() {
    const id = useParams()
    const [data, setData] = useState()
    const [video, setvideo] = useState()
    const [number, setNumber] = useState()

    const array = new Array(20, 'kl')

    const dispatch = useDispatch();
    const videos = useSelector((state) => state.post.postList.data);

    const getRandomNumbersWithoutRepeats = (min, max, count) => {
        if (count > max - min + 1) {
            console.error('Запрошенное количество уникальных чисел больше, чем возможно сгенерировать.');
            return [];
        }
    
        // Создаем массив чисел от min до max
        const range = Array.from({ length: max - min + 1 }, (_, index) => min + index);
    
        // Перемешиваем массив случайным образом
        for (let i = range.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [range[i], range[j]] = [range[j], range[i]];
        }
    
        // Выбираем первые count элементов из перемешанного массива
        return range.slice(0, count);
    };
    
    const randomNumbers = getRandomNumbersWithoutRepeats(0, 21, 21);
    console.log(randomNumbers);

    useEffect(() => {
        const getData = async () => {

            try {
                const response = await fetch('https://myfitnesstrack-server2-genabmqwa-elizbaryananush.vercel.app/api/getItem', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: id,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                })

                const data = await response.json()
                setData(data)
            } catch (err) {
                console.log(err);
            }
        }

        getData()
    }, [])

    const like = async (id) => {
        const response = await fetch('https://myfitnesstrack-server2-genabmqwa-elizbaryananush.vercel.app/api/like', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        const data = await response.json()

        console.log(id);
    }


    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (videos === null) {
        return <div>Loading...</div>;
    } else {
        console.log(videos);
    }
    return (
        <div className='Item'>
            <div className="left">
                {
                    data ? <div>
                        <div className="top">
                            <video muted loop autoPlay>
                                <source src={data.link} />
                            </video>
                        </div>
                        <div className="chgitem">
                            <div className="side">
                                <p className='name'>{data.name}</p>
                                <p className='genre'>{data.genre}</p>
                            </div>
                            <div className="bottom">
                                {/* <p className='genre'>{data.genre}</p> */}
                                <div onClick={() => {
                                    like(data._id)
                                    dispatch(postsActions.liked({
                                        _id: data._id
                                    }))
                                }}>

                                    {
                                        videos && data ? videos.map(item => {
                                            if (item) {
                                                if (item._id == data._id) {
                                                    console.log(item)
                                                    return <div>
                                                        {!item.liked ? <svg
                                                            className='notfilled'
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            width="512"
                                                            height="512"><g
                                                                id="_01_align_center"
                                                                data-name="01 align center"><path
                                                                    d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,12.448,15.253,18.416,12,20.846Z"
                                                                />
                                                            </g>
                                                        </svg> : <svg
                                                            className='filled'
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            id="Layer_1"
                                                            data-name="Layer 1"
                                                            viewBox="0 0 24 24"
                                                            width="512"
                                                            height="512"><path
                                                                d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z"
                                                            />
                                                        </svg>
                                                        }
                                                    </div>
                                                }
                                            }
                                        }) : <h1>nope</h1>
                                    }

                                </div>

                            </div>
                        </div>
                    </div> : null
                }
            </div>
            <div className="right">
                <p>recomendations</p>
                <div className="recs">

                    {
                        videos ? randomNumbers.map((number, index) => {
                            return <div className="box">
                                <video muted >
                                    <source src={videos[number].link} />
                                </video>
                                <p>{videos[number].name}</p>
                            </div>
                        }) : null
                    }
                </div>

            </div>
        </div>
    )
}

export default Item