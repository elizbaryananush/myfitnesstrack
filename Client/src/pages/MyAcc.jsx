import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import Liked from '../components/Liked';

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

function MyAcc() {
  const [page, setPage] = useState(1)
  const [text, setText] = useState('Weight')
  const [show, setShow] = useState(false)
  const [username, setUsername] = useState('')
  const [wshow, setwshow] = useState(false)
  const [hshow, sethshow] = useState(false)
  const [hnum, setHnum] = useState()
  const [wnum, setWnum] = useState()
  const [hArr, setHArr] = useState([])
  const [wArr, setWArr] = useState([])
  const [height2, setHeight] = useState([])
  const [weight2, setWeight] = useState([])
  const [shouldRenderChart, setShouldRenderChart] = useState(false);
  const [shouldRenderChart2, setShouldRenderChart2] = useState(false);

  const addH = (e) => {
    e.preventDefault()
    setHArr((prevArr) => [...prevArr, hnum])
    sethshow(!hshow)
    setShouldRenderChart(true);
    // setHnum('')
  }

  const addW = (e) => {
    e.preventDefault()
    setWArr((prevArr) => [...prevArr, wnum])
    setwshow(!wshow)
    setShouldRenderChart2(true);
  }



  async function getData() {
    const response = await fetch('https://myfitnesstrack-server1.vercel.app/api/profile', {
      credentials: 'include'
    })

    const data = await response.json()

    setUsername(await data.username);

  }


  const getInfo = async (height3, weight3) => {
    if (username !== null && height3 === true) {
      const info = await fetch('https://myfitnesstrack-server1.vercel.app/api/info', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          height: hnum,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const data = await info.json();
      if (data && data.charts && data.charts.height.length > 0) {
        setHeight(data.charts.height);
      }
    }
    else if (username !== null && weight3 === true) {
      const info = await fetch('https://myfitnesstrack-server1.vercel.app/api/info', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          weight: wnum,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const data = await info.json();
      if (data && data.charts && data.charts.weight.length > 0) {
        setWeight(data.charts.weight);
      }

    }
    else {
      const info = await fetch('https://myfitnesstrack-server1.vercel.app/api/info', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const data = await info.json();
      if (data && data.charts && data.charts.height.length > 0) {
        setHeight(data.charts.height);
      }

      if (data && data.charts && data.charts.weight.length > 0) {
        setWeight(data.charts.weight);
      }
    }
  }

  const logout = async () => {
    await fetch('https://myfitnesstrack-server1-cjqof66lh-elizbaryananush.vercel.app/logout', {
      credentials: 'include',
      method: 'POST'
    })
    setUsername(null)
    window.location.href = '/signin'
  }

  useEffect(() => {
    getData()
    getInfo()
  }, [username])

  useEffect(() => {
    getInfo(true, false)
    setHnum('')
  }, [hArr, username])

  useEffect(() => {
    getInfo(false, true)
    setWnum('')
  }, [wArr, username])

  let data2 = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        labels: 'height',
        data: hArr,
        backgroundColor: 'blue'
      }
    ]
  }

  let options2 = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 140,
        max: 200
      }
    }
  }

  let data = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        labels: 'weight',
        data: wArr,
        backgroundColor: 'blue'
      }
    ]
  }

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 0,
        max: 70
      },
    }
  }

  data = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        labels: 'weight',
        data: weight2,
        backgroundColor: 'blue'
      }
    ]
  }
  data2 = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        labels: 'height',
        data: height2,
        backgroundColor: 'blue'
      }
    ]
  }



  return (
    <div className='MyAcc'>
      <div className="side">
        <div className="pfp"></div>
        <div className="settings">
          <p className='username'>{username}</p>
          <div className="element">
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M12,24A12,12,0,1,1,24,12,12.013,12.013,0,0,1,12,24ZM12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm5.666,13.746a1,1,0,0,0-1.33-1.494A7.508,7.508,0,0,1,12,16a7.509,7.509,0,0,1-4.334-1.746,1,1,0,0,0-1.332,1.492A9.454,9.454,0,0,0,12,18,9.454,9.454,0,0,0,17.666,15.746ZM6,10c0,1,.895,1,2,1s2,0,2-1a2,2,0,0,0-4,0Zm8,0c0,1,.895,1,2,1s2,0,2-1a2,2,0,0,0-4,0Z" /></svg>
            <p>set status</p>
          </div>
          <div className="element">
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M9,12c3.309,0,6-2.691,6-6S12.309,0,9,0,3,2.691,3,6s2.691,6,6,6Zm0-10c2.206,0,4,1.794,4,4s-1.794,4-4,4-4-1.794-4-4,1.794-4,4-4Zm1.75,14.22c-.568-.146-1.157-.22-1.75-.22-3.86,0-7,3.14-7,7,0,.552-.448,1-1,1s-1-.448-1-1c0-4.962,4.038-9,9-9,.762,0,1.519,.095,2.25,.284,.535,.138,.856,.683,.719,1.218-.137,.535-.68,.856-1.218,.719Zm12.371-4.341c-1.134-1.134-3.11-1.134-4.243,0l-6.707,6.707c-.755,.755-1.172,1.76-1.172,2.829v1.586c0,.552,.448,1,1,1h1.586c1.069,0,2.073-.417,2.828-1.172l6.707-6.707c.567-.567,.879-1.32,.879-2.122s-.312-1.555-.878-2.121Zm-1.415,2.828l-6.708,6.707c-.377,.378-.879,.586-1.414,.586h-.586v-.586c0-.534,.208-1.036,.586-1.414l6.708-6.707c.377-.378,1.036-.378,1.414,0,.189,.188,.293,.439,.293,.707s-.104,.518-.293,.707Z" /></svg>
            <p>edit account</p>
          </div>
          <div className="element">
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M19,8.424V7A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z" /><path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z" /></svg>
            <p>Password & Security</p>
          </div>
          <div className="element">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm8.647,7H17.426a19.676,19.676,0,0,0-2.821-4.644A10.031,10.031,0,0,1,20.647,7ZM16.5,12a10.211,10.211,0,0,1-.476,3H7.976A10.211,10.211,0,0,1,7.5,12a10.211,10.211,0,0,1,.476-3h8.048A10.211,10.211,0,0,1,16.5,12ZM8.778,17h6.444A19.614,19.614,0,0,1,12,21.588,19.57,19.57,0,0,1,8.778,17Zm0-10A19.614,19.614,0,0,1,12,2.412,19.57,19.57,0,0,1,15.222,7ZM9.4,2.356A19.676,19.676,0,0,0,6.574,7H3.353A10.031,10.031,0,0,1,9.4,2.356ZM2.461,9H5.9a12.016,12.016,0,0,0-.4,3,12.016,12.016,0,0,0,.4,3H2.461a9.992,9.992,0,0,1,0-6Zm.892,8H6.574A19.676,19.676,0,0,0,9.4,21.644,10.031,10.031,0,0,1,3.353,17Zm11.252,4.644A19.676,19.676,0,0,0,17.426,17h3.221A10.031,10.031,0,0,1,14.605,21.644ZM21.539,15H18.1a12.016,12.016,0,0,0,.4-3,12.016,12.016,0,0,0-.4-3h3.437a9.992,9.992,0,0,1,0,6Z" /></g></svg>
            <p>language</p>
          </div>
          <div className="element">
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" /><path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z" /></svg>
            <p>settings</p>
          </div>
          <div className="element">
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M22.922,1.7a2.985,2.985,0,0,0-2.458-.648l-6.18,1.123A3.993,3.993,0,0,0,12,3.461,3.993,3.993,0,0,0,9.716,2.172L3.536,1.049A3,3,0,0,0,0,4V20.834l12,2.183,12-2.183V4A2.992,2.992,0,0,0,22.922,1.7ZM11,20.8,2,19.166V4a1,1,0,0,1,1.179-.983L9.358,4.14A2,2,0,0,1,11,6.108Zm11-1.636L13,20.8V6.108A2,2,0,0,1,14.642,4.14l6.179-1.123A1,1,0,0,1,22,4Z" /></svg>
            <p>docs</p>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="top">
          <ul>
            <li onClick={() => setPage(1)} className={page === 1 ? 'active' : null}>main</li>
            <li onClick={() => setPage(2)} className={page === 2 ? 'active' : null}>liked</li>
            <li onClick={() => setPage(3)} className={page === 3 ? 'active' : null}>history</li>
            <li onClick={() => setPage(4)} className={page === 4 ? 'active' : null}>personal records</li>
            <li>
              <a onClick={logout} > log out </a>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <div style={page === 1 ? { display: 'block' } : { display: 'none' }} className="first">
            <div className="section">
              <div className="head">
                <p>Weight</p>
                <button onClick={() => setwshow(true)} className='btn3'>add new dot +</button>
              </div>
              {shouldRenderChart2 ? (
                <Line data={data} options={options} />
              ) : <Line data={data} options={options} ></Line>}
              <div style={wshow ? { display: 'block' } : { display: 'none' }} className="dot">
                <div className="wrapper">
                  <p className='text'>be careful , you can't delete it later</p>
                  <form action="">
                    <p onClick={() => {
                      setwshow(false)
                    }}>&#10006;</p>
                    <input onChange={(e) => setWnum(e.target.value)} type="number" placeholder='Weight' value={wnum} />
                    <button
                      className="btn3"
                      onClick={addW}
                    >Add</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="head">
                <p>Height</p>
                <button onClick={() => sethshow(true)} className='btn3'>add new dot +</button>
              </div>
              {shouldRenderChart ? (
                <Line data={data2} options={options2} />
              ) : <Line data={data2} options={options2} ></Line>}
              <div style={hshow ? { display: 'block' } : { display: 'none' }} className="dot">
                <div className="wrapper">
                  <p className='text'>be careful , you can't delete it later</p>
                  <form action="">
                    <p onClick={() => {
                      sethshow(false)
                    }}>&#10006;</p>
                    <input onChange={(e) => setHnum(e.target.value)} type="number" placeholder='Height' value={hnum} />
                    <button
                      className="btn3"
                      onClick={addH}
                    >Add</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div style={page === 2 ? { display: 'block' } : { display: 'none' }} className="second">
            <Liked />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAcc