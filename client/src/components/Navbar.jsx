import React, { useContext } from 'react'
import Logo from '../img/logo.jpg'
import { Link ,useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { BottomNavigation, BottomNavigationAction,createTheme,ThemeProvider } from '@mui/material';
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate();
  const cat = ["normal", "study", "time", "world", "adventure"]
  const theme = createTheme({
    components: {
      // Name of the component
      MuiBottomNavigationAction:{
        styleOverrides:{
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '16px',
          },
          label:{
            fontSize: '16px',
            "&.Mui-selected": {  color: "#777"    }
          }
        },
      },
    },
  });
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
        <ThemeProvider theme={theme}>
          <BottomNavigation
            showLabels
            onChange={(event, newValue) => {
              navigate(`/?cat=${cat[newValue]}`)
            }} 
          >
            <BottomNavigationAction  className='link' label="日常" />
            <BottomNavigationAction  className='link' label="学习" />
            <BottomNavigationAction  className='link' label="时间" />
            <BottomNavigationAction  className='link' label="世界" />
            <BottomNavigationAction  className='link' label="冒险" />
            
          </BottomNavigation>
          </ThemeProvider>
         
          {/* <Link className='link' to="/?cat=normal"><h6>日常</h6></Link>
          <Link className='link' to="/?cat=study"><h6>学习</h6></Link>
          <Link className='link' to="/?cat=time"><h6>时间</h6></Link>
          <Link className='link' to="/?cat=world"><h6>世界</h6></Link>
          <Link className='link' to="/?cat=adventure"><h6>冒险</h6></Link> */}
          <span className='link'> {currentUser?.username}</span>
          {currentUser && currentUser.img != "" ? <img src={"../avater/" + currentUser.img} alt="" /> : <img src="../avater/default.jpg" alt="" />}
          {currentUser ? <span className='link' onClick={logout}> 注销</span> : <Link className='link' to="/login">登录</Link>}
          <span className='Write'> <Link className='link' to='/write'>写文章</Link>  </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
