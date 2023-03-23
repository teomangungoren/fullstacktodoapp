import { useContext } from "react";
import { AuthContext } from "./AuthContext";


function Footer(){
    const authContext=useContext(AuthContext);

  return(
    <footer className="footer">
     <div className="container">
         Your Footer
     </div>
    </footer>
  )
};

export default Footer;