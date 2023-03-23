import { createContext,useContext,useState } from "react";

export const AuthContext=createContext();

export const useAuth=()=>useContext(AuthContext);

function AuthProvider({children}){
 
const[isAuthenticated,SetAuthenticated]=useState(false);

const [username,setUsername]=useState(null);


  function login(username,password){
    if(username==="teomangungoren" && password==="gungoren"){
      SetAuthenticated(true);
      setUsername(username);
      return true;
    }
    else{
      SetAuthenticated(false);
      setUsername(null);
      return false;
    };
  }

  function logout(){
    SetAuthenticated(false);
  }

  return(
     <AuthContext.Provider value={{isAuthenticated,login,logout,username}}>
      {children}
     </AuthContext.Provider>
  )
}

export default AuthProvider;