import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


function Login(){
  const[username,setUsername]=useState("teomangungoren");
  const[password,setPassword]=useState("");
  const[showSuccessMessage,setShowSuccessMessage]=useState(false);
  const[showErrorMessage,setShowErrorMessage]=useState(false);
  const navigate=useNavigate();
  const authContext=useAuth();

  const handleUsernameChange=(event)=>{
      setUsername(event.target.value);
  };

  const handlePasswordChange=(event)=>{
    setPassword(event.target.value);
  };
    
  function handleSubmit(){
    if(authContext.login(username,password)){
      navigate(`/welcome/${username}`);
    }
    else{
      setShowErrorMessage(true);
    };
  }

     

  return(
     <div className="Login">
      <h1>Time to Login</h1>
      {showErrorMessage && <div className="errorMessage">Authenticated Failed</div>}
        <div className="LoginForm">
           <label>Username</label>
           <input type="text" name="username" value={username} onChange={handleUsernameChange} />          
          </div> 
          <div>
            <label>Password</label>
            <input type="password" name="password" onChange={handlePasswordChange} />
          </div>
          <button  type="button" name="login" onClick={handleSubmit}>Login</button>
      </div>
  )
}



export default Login;