import "./ToDoApp.css";
import { BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import Login from "./Login";
import Welcome from "./Welcome";
import Error from "./Error";
import ListToDo from "./ListToDo";
import Header from "./Header";
import Footer from "./Footer";
import { Update } from "./Update";
import Logout from "./Logout";
import AuthProvider, { useAuth } from "./AuthContext";

function AuthenticatedRoute({children}){
 const authContext=useAuth();
  
 if(authContext.isAuthenticated)
  return children;

return <Navigate to="/"/>
}


function ToDoApp(){
  return(
 <div className="ToDoApp">
       <AuthProvider>
      <BrowserRouter>
      <Header/> 
       <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/welcome/:username" element={
           <AuthenticatedRoute>
            <Welcome/>
           </AuthenticatedRoute>
        }/>
        <Route path="/todo" element={
         <AuthenticatedRoute>
           <ListToDo/>
         </AuthenticatedRoute>
        }/>
       <Route path="/todos/:id" element={
         <AuthenticatedRoute>
           <Update/>
         </AuthenticatedRoute>
        }/>
        <Route path="/logout" element={
        <AuthenticatedRoute>
          <Logout/>
        </AuthenticatedRoute>
        }/>
        <Route path="/*" element={<Error/>}/>
       </Routes>
       <Footer/>
      </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default ToDoApp;