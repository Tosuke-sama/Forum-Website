import React, { useContext } from 'react'
import Logo from '../img/logo.jpg'
import { Link ,useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import { BottomNavigation,List,ListItem,ListItemText,ListItemButton, BottomNavigationAction,createTheme,ThemeProvider,Drawer,Button  } from '@mui/material';
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate();
  const cat = ["normal", "study", "time", "world", "adventure"]
  const theme = createTheme({
    components: {
      // Name of the component
      MuiBottomNavigation:{
        styleOverrides:{
          // Name of the slot
          root: {
           width:"70%",
          }
      }
    },
      MuiBottomNavigationAction:{
        styleOverrides:{
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '16px',
            width:"100%"
          },
          label:{
            fontSize: '16px',
            width:"70%",
            "&.Mui-selected": {  color: "#777"    }
          }
        },
      },
    },
  });
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = ()=>{setOpen(!open)};
  const navClick = (index)=>{
    return ()=>{
      navigate(`/?cat=${cat[index]}`)
      setOpen(false)
    }
  }
  const list =()=>{
    return(
      <div style={{width:"150px",marginTop:"20%"}}>
       <List>
        {['日常', '学习', '时间', '世界','冒险'].map((text, index) => (
          <ListItem key={text} disablePadding style={{marginTop:"20px"}} >
            <ListItemButton onClick={navClick(index)}>
              <ListItemText primary={text} style={{textAlign:"center"}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </div>
    )
  }
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className='mobileAvater'>
          {currentUser && currentUser.img != "" ? <img src={"../avater/" + currentUser.img} alt="" /> : <img src="../avater/default.jpg" alt="" />}
          <span className='link'> {currentUser?.username}</span>
          {currentUser ? <span className='link' onClick={logout}> 注销</span> : <Link className='link' to="/login">登录</Link>}
          <span className='Write'> <Link className='link' to='/write'>写文章</Link>  </span>
        </div>
        <div className='mobileNav'>
        <Button
        onClick={toggleDrawer}
      >
      <DensityMediumOutlinedIcon/>
      </Button>
      <Drawer
            anchor={"right"}
            open={open}
            onClose={toggleDrawer}
          >
            {list(list)}
          </Drawer>
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
