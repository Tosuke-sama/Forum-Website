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
import Adventure from './pages/Adventure.jsx';
// let isPopup = sessionStorage.getItem("popUp")||"true"
  // const [isPopup,setIsPopup] = useState(sessionStorage.getItem("popUp")||"true")
 
const Latout = () => {
  const [isPopup,setIsPopup] = useState(sessionStorage.getItem("popUp")||"true")
  const [show,setShow] = useState(false);
  const handlePopup = ()=>{
    sessionStorage.setItem("popUp",false)
    setIsPopup(false)
  }

  setTimeout(() => {
  setShow(true)
  }, 1000);

  return (
    <div>
      <Navbar/>
      <Outlet/>
      {show && <Footer />}
      <Popup click={handlePopup} isShow={isPopup==="true"} content={{title:"好久不见",
        title2:"~欢迎来到京介的怪谈小屋~",
        explain:"此为京介个人记录的站点，京介也赞成大家写下自己的观点或者建议",
        ending:"祝你过得开心！",
        url:"popup.jpg"
        }}></Popup>
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
      {
        path: "/adventure",
        element: <Adventure/>,
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
    </AuthContextProvider>
  // </React.StrictMode>,
)
