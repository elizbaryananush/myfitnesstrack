import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useReducer, useState } from 'react'
import { fetchData, postsActions } from '../redux/videoSlice';

function Workouts() {
  const [workouts, setWorkouts] = useState()
  const [genre, setgenre] = useState('all')
  const [state, setState] = useState(false)

  const dispatch = useDispatch();
  const videos = useSelector((state) => state.post.postList.data);
  const videos2 = useSelector((state) => state.post.postList);


  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:8000/api/getWorkouts', {
        method: 'GET',
      })

      const data = await response.json()
      setWorkouts(data)
    }

    getData()
  }, [])

  const like = async (id) => {
    const response = await fetch('http://localhost:8000/api/like', {
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
    <div className='Workouts'>
      <div className="header">
        <video muted autoPlay loop>
          <source src='https://v4.cdnpk.net/videvo_files/video/free/video0460/large_watermarked/_import_60cd8887115092.66748248_FPpreview.mp4' type="video/mp4" />
        </video>
        <p>Start your journey towards your dream physique</p>
      </div>
      <div className="main">
        <div className="btns">
          <button className={genre === 'all' ? 'active btn3' : 'btn3'} onClick={() => setgenre('all')}>all</button>
          <button className={genre === "stretching legs" ? 'active btn3' : 'btn3'} onClick={() => setgenre("stretching legs")}>legs</button>
          <button className={genre === 'abs' ? 'active btn3' : 'btn3'} onClick={() => setgenre('abs')}>abs</button>
          <button className={genre === 'push ups' ? 'active btn3' : 'btn3'} onClick={() => setgenre('push ups')}>push ups</button>
        </div>
        <div className="grid">
          {workouts ? workouts.map((item, index) => {

            if (genre === 'all') {

              return <div key={index} className='item'>

                <video  muted loop>
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
                  <div onClick={() => {
                    like(item._id)
                    dispatch(postsActions.liked({
                      _id: item._id
                    }))
                  }}>

                    <svg
                      style={videos[index].liked ? { display: 'none' } : { display: 'block' }}
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
                    </svg>

                    <svg
                      style={!videos[index].liked ? { display: 'none' } : { display: 'block' }}
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

                  </div>

                </div>

              </ div>

            } else if (genre === item.genre) {

              if (item.genre === genre) {

                return <div key={index} className='item'>

                  <video loading='lazy' muted loop>
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
                    <div onClick={() => {
                      like(item._id)
                      dispatch(postsActions.liked({
                        _id: item._id
                      }))
                    }}>

                      {
                        !videos[index].liked ? <svg

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

                  </div>

                </ div>
              }
            }
          }) : null
          }
        </div>
      </div>
    </div >
  )
}

export default Workouts