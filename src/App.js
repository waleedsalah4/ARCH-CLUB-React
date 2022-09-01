import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/home/Home';
import SignIn from './components/register/SignIn';
import SignUp from './components/register/SignUp';
import ForgotPassword from './components/register/ForgotPassword';
import Layout from './components/layout/Layout';
import Events from './components/events/Events';
import Podcasts from './components/podcasts/Podcasts';
import Discover from './components/discover/Discover';
import Profile from './components/profile/Profile';
// import PodcastPlayer from './components/podcasts/PodcastPlayer';
// import MusicPlayerSlider from './components/podcasts/testComponent';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />  
        <Route element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/events' element={<Events />} />
          <Route path='/podcasts' element={<Podcasts />} />
          {/* <Route path='/podcast-player/:id' element={<PodcastPlayer />} /> */}
          <Route path='/discover' element={<Discover />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user-profile/:id' element={<Profile />} /> 
        </Route>
        {/* Register */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </>
  )
}

export default App
