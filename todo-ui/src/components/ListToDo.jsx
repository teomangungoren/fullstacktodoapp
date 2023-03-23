import { useEffect,useState } from "react";
import { retrieveAllTodosForUsernameApi,deleteTodoApi} from "./TodoApiService";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function ListToDo(){
  const today=new Date();
 const targetDate=new Date(today.getFullYear(),today.getMonth(),today.getDate());
  const [todos,setTodos]=useState([]);
  const [message,setMessage]=useState(null);
   const navigate=useNavigate();

  const authContext=useAuth();

  const username=authContext.username;

  useEffect(()=>{refreshTodos()},[]);

function refreshTodos(){
retrieveAllTodosForUsernameApi(username)
.then(response=>{
  console.log(response)
setTodos(response.data);
})
.catch(error=>console.log(error))
}

  function deleteTodo(id){
   deleteTodoApi(username,id)
   .then(
        ()=>{
          setMessage(`Delete of todo with ${id} succesfully`);
          refreshTodos();
        }
   )
   .catch(error=>console.log(error));
 }

 function updateTodo(id){
  console.log("clicked"+id)
  navigate(`/todos/${id}`);
 };



  return(
    <div className="container">
      <h1>Things You Want To Do!</h1>
      {message&&<div className="alert alert-warning">{message}</div>}
       <div>
        <table className="table">
          <thead>
             <tr>
               <th>descriptions</th>
               <th>is Done? </th>
               <th>Target Date</th>
               <th>Delete</th>
               <th>Update</th>
             </tr>
          </thead>
          <tbody>
            {
              todos.map(
                todo=>(
                <tr key={todo.id}>
                 <td>{todo.description}</td>
                 <td>{todo.done.toString()}</td>
                 <td>{todo.targetDate.toString()}</td>
                 <td><button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                 <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Update</button></td>
                 </tr>
                )
              )
            }

            
          </tbody>
        </table>
       </div>
    </div>
  )
}

export default ListToDo;