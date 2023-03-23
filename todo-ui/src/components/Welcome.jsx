import { useParams,Link} from "react-router-dom"


function Welcome(){
  const {username}=useParams();
  console.log(username);
  return(
    <div className="Welcome">
        <h1>Welcome {username}</h1>
        <div>
          Manage your todos-<Link to="/todo">See</Link>
        </div>
      </div>
  )
}

export default Welcome