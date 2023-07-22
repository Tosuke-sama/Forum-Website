import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/login.jsx';
import Write from './pages/write.jsx';
import Single from './pages/Single.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { CSSTransition, TransitionGroup } from "react-transition-group";

import './style.scss'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from './context/authContext.js';
const Latout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Latout/>,
    children: [
      { path: "/", element: <Home/> },
      { path: "/write", element: <Write/> },
      { path: "/post/:id", element: <Single/> },
  ],
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthContextProvider>
    <div className='app'>
      <div className='container'>
      <RouterProvider router={router} />
      </div>
    </div>
    </AuthContextProvider>
  </React.StrictMode>,
)
