
import React  from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

 import {useParams , useRouteMatch} from 'react-router-dom'
 import Login from './component/login';
 import Register from './component/register';
 import Home from './component/Home';
 import Dashboard from './component/Dashboard';
 import ConfirmLogin from './component/ConfirmLogin';
 import UpdateUser from './component/UpdateUser';
 import ForgetUser from './component/ForgetUser';
 import ChangePassword from './component/ChangePassword';
 import Access from './component/Access';
 import {BrowserRouter as Router, Switch ,Route ,Link , withRouter} from "react-router-dom";



 

export default function App() {


 
   
  return (

    
      <Router>

  
    <div>
     
       
         <Dashboard />
         
        <Switch>

            
           <Route exact path="/" component={Home}/>
           <Route exact path="/Home" component={Home}/>
           <Route  path="/register" component = {Register} />
           <Route  path="/login" component={Login} />
           <Route exact  path="/ConfirmLogin/:token" component={ConfirmLogin} />
           <Route exact  path="/UpdateUser/:id" component={UpdateUser} />
           <Route exact  path="/ForgetUser" component={ForgetUser} />
           <Route exact  path="/ChangePassword/:token" component={ChangePassword} />
           <Route exact  path="/Access" component={Access} />
          
          
          
      
        </Switch>

    
   </div>
   
         </Router>
          

  
   );
}










