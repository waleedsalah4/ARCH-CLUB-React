import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import Loader from './components/utilities/Loader';
// import LandingPage from './components/LandingPage';
// import SignIn from './components/register/SignIn';
// import SignUp from './components/register/SignUp';
// import ForgotPassword from './components/register/ForgotPassword';
// import ResetPassword from './components/register/ResetPassword';
// import Layout from './components/layout/Layout';
// import Home from './components/home/Home';
// import Events from './components/events/Events';
// import Podcasts from './components/podcasts/Podcasts';
// import Discover from './components/discover/Discover';
// import Profile from './components/profile/Profile';
// import SearchPage from './components/searchCompoents/SearchPage';
const LazyLandingPage= React.lazy(() => import('./components/LandingPage'))
const LazySignIn = React.lazy(() => import('./components/register/SignIn'))
const LazySignUp = React.lazy(() => import('./components/register/SignUp'))
const LazyForgotPassword = React.lazy(() => import('./components/register/ForgotPassword'))
const LazyLayout = React.lazy(() => import('./components/layout/Layout'))
const LazyHome = React.lazy(() => import('./components/home/Home'))
const LazyEvents = React.lazy(() => import('./components/events/Events'))
const LazyPodcasts = React.lazy(() => import('./components/podcasts/Podcasts'))
const LazyDiscover = React.lazy(() => import('./components/discover/Discover'))
const LazyProfile = React.lazy(() => import('./components/profile/Profile'))
const LazySearchPage = React.lazy(() => import('./components/searchCompoents/SearchPage'))
const LazyNotFound = React.lazy(() => import('./components/utilities/NotFound'))




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <React.Suspense fallback={<Loader />}>
            <LazyLandingPage />
          </React.Suspense>
        } />  
        <Route element={ 
          <React.Suspense fallback={<Loader />}>
            <LazyLayout />
          </React.Suspense>
        }>
          <Route path='/home' element={
            <React.Suspense fullback={<Loader />}>
              <LazyHome />
            </React.Suspense>
          } />
          <Route path='/events' element={
            <React.Suspense fallback={<Loader />}>
              <LazyEvents />
          </React.Suspense>
          } />
          <Route path='/podcasts' element={
            <React.Suspense fallback={<Loader />}>
              <LazyPodcasts />
            </React.Suspense>
            } />
          <Route path='/discover' element={
            <React.Suspense fallback={<Loader />}>
              <LazyDiscover />
            </React.Suspense>
          } />
          <Route path='/profile' element={
            <React.Suspense fallback={<Loader />}>
              <LazyProfile />
            </React.Suspense>
          } />
          <Route path='/user-profile/:id' element={
            <React.Suspense fallback={<Loader />}>
            <LazyProfile />
            </React.Suspense>
          } /> 
          <Route path='/search/:text' element={
            <React.Suspense fallback={<Loader />}>
             <LazySearchPage />
            </React.Suspense>
          }
           />
        </Route>
        {/* Register */}
        <Route path='/signin' element={
          <React.Suspense fallback={<Loader />}>
            <LazySignIn />
          </React.Suspense>
        } />
        <Route path='/signup' element={
          <React.Suspense fallback={<Loader />}>
            <LazySignUp />
          </React.Suspense>
        } />
        <Route path='/forgot-password' element={
          <React.Suspense fallback={<Loader />}>
            <LazyForgotPassword />
          </React.Suspense>
        } />
        {/* <Route path='/reset-password' element={<ResetPassword />} /> */}
        <Route path="*" element={<LazyNotFound />} />
      </Routes>
    </>
  )
}

export default App
