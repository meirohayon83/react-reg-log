import React , {useState , useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import Container from '@material-ui/core/Container';
import {Formik ,Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/FormikControl'
import Dashboard from './Dashboard';

import axios from 'axios';

import ForgetUser from './ForgetUser'
import Register from './register';
import Access from './Access';

 

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  TextField: {
      margin: theme.spacing(2,0,1)
  }
}));

export default function Login() {

  
    const [message , setMessage] = useState()
    const [data , setData] = useState('')

  const classes = useStyles();

   const initialValues = {
        email: '',
        password:''

        
    }
    const validationSchema = Yup.object({
      
        email: Yup.string().required('required').email(),
        password: Yup.string().required('required'),
        
    })


 
     const history = useHistory();

    const onSubmit = values => {
         
        console.log('Form data' ,values);
       

  
      axios.post(`http://localhost:3334/login` , values)
      .then(res => {
        const persons = res.data;
        // console.log(res.data)

          localStorage.setItem('token',res.data.token)
          localStorage.setItem('userId' ,res.data.id)
          sessionStorage.setItem('email',res.data.email);
          sessionStorage.setItem('nickName' , res.data.nickName)
          sessionStorage.setItem('city' , res.data.city)
          sessionStorage.setItem('phone' , res.data.phone)
          sessionStorage.setItem('neighborhood', res.data.neighborhood)

          setMessage(`hello ${res.data.nickName} you accessed login`)
          history.push("/Access");

       })
        .catch(err => {
        console.error(err);

      });

          
    

      }



  
 
  return (

     
        
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
       >
       { formik => { return(
           

       
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        
        <Form className={classes.form} noValidate>
         

           <FormikControl
                  variant="outlined"
                  fullWidth
                  control= 'input'
                  type="email"
                  label="email"
                  name="email"
             />
        
           <FormikControl
                  className={classes.TextField}
                  variant="outlined"
                  fullWidth
                  control= 'input'
                  type="password"
                  label="password"
                  name="password"
             />


          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            Sign In
          </Button>
          <div className={classes.avatar}>{message}</div>
          <Grid container>
            <Grid item xs>
              <Link href="./ForgetUser" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="./Register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Form>
      </div>
    
    </Container>

       )}}
    </Formik>
  );
}
