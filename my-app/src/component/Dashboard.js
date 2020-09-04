
import React ,{useEffect , useMemo , useState , useContext} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Login from './login';
import Register from './register';
import Home from './Home'
import ConfirmLogin from './ConfirmLogin';
import UpdateUser from './UpdateUser';
import {BrowserRouter as Router, Switch ,Route ,Link} from "react-router-dom";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import axios from 'axios';

const token = localStorage.getItem('token')
const id = localStorage.getItem('userId')

axios.interceptors.request.use(

  config =>{
    
    config.headers.authorization = `Bearer ${token}`;
     return config
  },
  error =>{
    return Promise.reject(error)
  }
)


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
     user: {
      flexGrow: 10,
    },
  }),
);

export default function Dashboard() {

  
      const [userLog , setUserLog] = useState(false)

      const [userName , setUserName] = useState('')

      useEffect(() =>{
        
        const userN = sessionStorage.getItem('nickName')

        if(userN) {
          return setUserLog(true),
          setUserName(userN)
         
        }
     })

        
      
  const classes = useStyles();



   const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

//  const update = () => {

//      <Link to="/UpdateUser"></Link>
//      setAnchorEl(null);
//  }


const deleteUser = () => {

 const id = localStorage.getItem('userId');
 if(window.confirm('Are you sure you want to delete')){

  axios.delete(`http://localhost:3334/user/${id}`).then(res => {
     
     console.log(res);  
     setAnchorEl(null)
  }).catch(err => 
    console.log(err),
    setAnchorEl(null)
  ) 
   setAnchorEl(null)
 }
};

 const logout = () => {
  
  localStorage.clear()
  sessionStorage.clear()
  
}

  return (
     
 <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
           <Link to="/Home">Home</Link>
            
          </Typography>

          
         { userLog ?  <Typography variant="h6" className={classes.user}> 

       
            <div> 
      <Button aria-controls="Dashboard" aria-haspopup="true" onClick={handleClick}>
        Hello : {userName}
      </Button>
      <Menu
        id="Dashboard"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}

        {/* <MenuItem onClick={hand}>Profile</MenuItem>
        <MenuItem onClick={han}>My account</MenuItem> */}
        <MenuItem onClick={deleteUser}>Delete</MenuItem>
        <MenuItem onClick={handleClose}> <Link to="/UpdateUser/  + {id} ">update</Link></MenuItem>
      </Menu>
     </div> 
           
           {/* <Link to="/Home">Home</Link>  */}



          
             </Typography> : null 
}
          

          <Button color="inherit"> <Link to="/Register">register</Link></Button> 
          <Button color="inherit"><Link to = "/Login">Login</Link></Button>
          {userName ? 
           <Button color="inherit" onClick={logout}>LogOut</Button> : null }
           {/* <Button color="inherit"><Link to = "/ConfirmLogin/:token">Confirm</Link></Button> */}
          

          

          
          
        </Toolbar>
      </AppBar>

      



      </div>

      
 );
}