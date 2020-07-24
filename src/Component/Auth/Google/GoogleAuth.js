import React, { Component } from 'react'

import { GoogleLogin, GoogleLogout } from 'react-google-login';



class GoogleAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: false,
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login (response) {
      console.log(JSON.stringify(response))
    if(response.wc.access_token){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.wc.access_token
      }));
      localStorage.setItem("accessToken", response.wc.access_token);
    }
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
    localStorage.removeItem("accessToken");
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }


  handleGoogleLogin(){
    let route = `auth/auth_provider/google`
    fetch(route)
      .then(res => res.text())
      .then(res => window.location.assign(res))
      .catch(console.error);
  }

  


  render() {
    return (
    <div>
   <button onClick={this.handleGoogleLogin}>
        Login with Google
      </button>
    </div>
    )
  }
}

export default GoogleAuth;




// import React from 'react';

// const useStateWithLocalStorage = localStorageKey => {
//   const [value, setValue] = React.useState(
//     localStorage.getItem(localStorageKey) || ''
//   );

//   window.sessionStorage.setItem("key", "value");

//   React.useEffect(() => {
//     localStorage.setItem(localStorageKey, value);
//   }, [value]);

//   return [value, setValue];
// };



// const useStateWithSessionStorage = sessionStorageKey => {
//   const [valueSession, setValueSession] = React.useState(
//     sessionStorage.getItem(sessionStorageKey) || ''
//   );

  

//   React.useEffect(() => {
//     sessionStorage.setItem(sessionStorageKey, valueSession);
//   }, [valueSession]);

//   return [valueSession, setValueSession];
// };




// const App = () => {
//   const [value, setValue] = useStateWithLocalStorage(
//     'myValueInLocalStorage'
//   );

//   const [sessionValue, setSessionValue] = useStateWithSessionStorage(
//     'myValueInSessionStorage'
//   );



//   const onChange = event => {
//     setValue(event.target.value)
//     setSessionValue(event.target.value)
//   };

//   return (
//     <div>
//       <h1>Hello React with Local Storage!</h1>

//       <input value={value} type="text" onChange={onChange} />

//       <p>{value}</p>
//        <p>{sessionValue}</p>
//     </div>
//   );
// };

// export default App;
