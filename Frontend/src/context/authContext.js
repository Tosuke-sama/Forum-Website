import axios from 'axios';
import React,{ createContext, useEffect,useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs)=> {
        try{
           const res = await axios.post("/auth/login",inputs);   
               setCurrentUser(res.data)
               console.log(res.data)   
        }catch(err){
            console.log(err);
            throw err;
        }
        
       
    }
    const logout = async (inputs)=> {
        axios.post("/auth/logout");
        setCurrentUser(null);
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])
    
    return(
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};