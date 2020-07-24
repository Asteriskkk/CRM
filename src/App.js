import React from 'react';
import './App.css';
import GoogleAuth from './Component/Auth/Google/GoogleAuth'
import  { Route, Switch, Redirect }  from 'react-router-dom'
import Home from './Component/Home/Home'
import LoginCallback from './Component/Auth/LoginCallback'
import Login from './Component/Auth/Login'
import AuthCheck,{Profile} from './util/AuthCheck'
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Component/Layout/Sidebar/Sidebar'
import Layout from './Component/Layout/Layout'
import Logout from './Component/Auth/Logout'

// const items = [
//   { name: 'contacts', label: 'Contacts' },
//   { name: 'lists', label: 'Lists' },
//   { name: 'templates', label: 'Templates' },
//   { name:'campaign', label: 'Campaign'}
// ]




const items = [
  {
    name: 'contacts',
    label: 'Contacts',
    items: [
      { name: 'all contacts', label: 'All Contacts' },
      { name: 'import Contacts', label: 'Import Contacts' },
    ],
  },
  {
    name: 'lists',
    label: 'Lists',
    items: [
      { name: 'create list', label: 'Create List' },
      { name: 'view list', label: 'View List' }
    ],
  },
  {
    name: 'templates',
    label: 'Templates',
    items: [
      { name: 'new templates', label: 'New Templates' },
      { name: 'saved templates', label: 'Saved Templates' }
    ],
  },
  {
    name: 'campaign',
    label: 'Campaign',
    items: [
      { name: 'new campaign', label: 'New Campaign' }
    ],
  }
]



function App() {
  return (
    <div className="App">
      {/* <Sidebar items={items}/> */}
      <Layout items={items}>
      <Switch>
      <Route path="/oauth_callback" exact component={LoginCallback} />
      <PrivateRoute path="/logout" exact component={Logout}/>
      <PrivateRoute path="/"  component={Home} tabname="Dashboard"/>
      </Switch>
      </Layout>
    </div>
    
  );
}





const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} 
  render={props =>
    AuthCheck() ? (
  <Component {...props} tabname="Dashboard"/>
  ) : (
  <Login tabname="Login" />
  )
  }
  />
  );

export default App;




