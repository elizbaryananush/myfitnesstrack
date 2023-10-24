import './App.scss';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Header from './components/Header';
import Services from './components/Services';
import Choose from './components/Choose';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import MyAcc from './pages/MyAcc';
import Workouts from './pages/Workouts';
import Post from './pages/Post';
import Item from './pages/Item';
import Videos from './pages/Videos';
import { useEffect, useState } from 'react';

function App() {
  const [style, setStyle] = useState('flex')
  const id = window.location.pathname

  function Main() {
    return <div className='Main'>
      <Header />
      <Services />
      <Choose />
      <Footer />
    </div>
  }

  useEffect(() => {
    if (id !== '/' && id !== '/signin' && id !== '/myacc') {
      console.log('havasar chi');
      setStyle('none')
    } else {
      setStyle('flex')
    }
  }, [id])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/myacc' element={<MyAcc />} />
          <Route path='/workouts' element={<Workouts />} />
          <Route path='/post' element={<Post />} />
          <Route path='/:id' element={<Item />} />
          <Route path='/videos' element={<Videos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
