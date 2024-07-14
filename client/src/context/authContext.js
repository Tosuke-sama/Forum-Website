import axios from 'axios';
import React,{ createContext, useEffect,useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [open, setOpen] = useState(false);
    // 普通的登录接口
    const login = async (inputs)=> {
        try{
           const res = await axios.post("/auth/login",inputs);   
            setCurrentUser(res.data)
            console.log(res.data) 
            setOpen(true);  
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    const logout = async (inputs)=> {
        axios.post("/auth/logout");
        setCurrentUser(null);
        setOpen(false); 
    }
    // QQ登录接口
    const qqLogin = (info)=> {
      try{
          setCurrentUser(info)
          console.log(info) 
          setOpen(true);  
      }catch(err){
          console.log(err);
          throw err;
      }
  }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])
    
    return(
        <AuthContext.Provider value={{currentUser,login,qqLogin,logout,open,setOpen}}>
            {children}
        </AuthContext.Provider>
    );
};