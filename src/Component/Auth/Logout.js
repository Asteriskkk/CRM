import React,{useState} from 'react'
import { useHistory } from "react-router-dom";


export default function Logout(props) {

    const [message, setMessage] = useState("logging out")
    console.log("logout",props)
    const history = useHistory();
    setTimeout(function(){
        let route = `/auth/logout`
        fetch(route)
          .then(res => res.json())
          .then(res => { 
            localStorage.setItem('name',"")
            localStorage.setItem('picture',"")
            history.push('/')
        }
            )
          .catch(console.error);
    },2000)
           
return <div><h1>{message}</h1></div>

}
