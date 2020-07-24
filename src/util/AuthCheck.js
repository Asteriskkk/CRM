import Cookies from 'js-cookie';
import { Base64 } from 'js-base64';

export default function AuthCheck() {
    return Cookies.get('payload')?true:false
}


export function Profile(){
    if(Cookies.get('payload')){
    let payload = Cookies.get('payload')
    let profile = Base64.decode(payload)
    console.log(profile,typeof profile)
    if(typeof profile =="string"){
        profile = JSON.parse(profile)
    }
    localStorage.setItem('name',profile.name)
    localStorage.setItem('picture',profile.picture)
}}