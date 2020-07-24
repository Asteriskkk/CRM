import React , {useEffect} from 'react'
import { useHistory } from "react-router-dom";

export default function LoginCallback({location}) {
    const history = useHistory()
 
    useEffect(() => {
        let code = (location.search.match(/code=([^&]+)/) || [])[1];
        console.log("code facebook",code)
        let route = `auth/gauth/redirect?code=${code}`
        fetch(route)
          .then(res => res.json())
          .then(res => history.push('/'))
          .catch(err=>{
            history.push('/')
          });
      }, []);

    return (
        <div>
            
        </div>
    )
}





