import React,{useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/login.jsx';
import Write from './pages/write.jsx';
import Single from './pages/Single.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Personal from './pages/Personal.jsx';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './style.scss'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthContextProvider } from './context/authContext.js';
import Popup from './components/Popup.jsx';
import Friendly from './pages/Friendly.jsx';
import Time from './pages/Time.jsx';
let isPopup = sessionStorage.getItem("popUp")||"true"
const handlePopup = ()=>{
  sessionStorage.setItem("popUp",false)
  isPopup = "false"
}
const Latout = () => {
  const [show,setShow] = useState(false);
  setTimeout(() => {
  setShow(true)
  }, 1000);
  return (
    <div>
      <Navbar/>
      <Outlet/>
      {show && <Footer />}
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
      {
        path: "/Personal/:id",
        element: <Personal/>,
      },
      {
        path: "/world",
        element: <Friendly/>,
      },
      {
        path: "/time",
        element: <Time/>,
      },
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

  // <React.StrictMode>
      <AuthContextProvider>
    <div className='app'>
      <div className='container'>
      <RouterProvider router={router} />
      </div>
    </div>
    <Popup click={handlePopup} isShow={isPopup}></Popup>
    </AuthContextProvider>
  // </React.StrictMode>,
)
