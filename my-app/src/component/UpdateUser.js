import React , {useState , useEffect} from 'react';
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


const token = localStorage.getItem('token')

axios.interceptors.request.use(

  config =>{
    
    config.headers.authorization = `Bearer ${token}`;
     return config
  },
  error =>{
    return Promise.reject(error)
  }
)
 

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



function UpdateUser() {

 const id = localStorage.getItem('userId')
     const classes = useStyles();

   const initialValues = {

        nickName: '',
        city: '',
        neighborhood:'',
        phone:'',
        password:'',
        confirmPassword:'',
       
    }
    const validationSchema = Yup.object({
      
        nickName: Yup.string().required('required'),
        city: Yup.string().required('required'),
        neighborhood: Yup.string().required('required'),
        phone: Yup.string().required('required'),
        password: Yup.string().required('required'),
          confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match')
         .required('Password confirm is required')
        
        

    })
 
    
    const onSubmit = values => {
         
        // console.log('Form data' ,values);
      if(window.confirm('Are you sure you want to updateUser')){

      axios.put(`http://localhost:3334/updateUser/${id}` , values)
      .then(res => {
        const persons = res.data;
        console.log(res.data)

         
        //   sessionStorage.setItem('email',res.data.email);
          sessionStorage.setItem('nickName' , res.data.nickName)
          sessionStorage.setItem('city' , res.data.city)
          sessionStorage.setItem('phone' , res.data.phone)
          sessionStorage.setItem('neighborhood', res.data.neighborhood)

       })
        .catch(err => {
        console.error(err);

      });

          
      }

      }

    return (
          <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
       >
       { formik => { return(
           
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update your account
        </Typography>
        <Form className={classes.form} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>

            
              
                <FormikControl 
                  variant="outlined"
                  fullWidth
                  control= 'input'
                  type="text"
                  label="nickName"
                  name="nickName"
             />
            
            </Grid>
           
            <Grid item xs={12}>
           
                <FormikControl
                  variant="outlined"
                  fullWidth
                  control= 'input'
                  type="text"
                  label="city"
                  name="city"
             />
            </Grid>
              

              <Grid item xs={12}>
              
                <FormikControl
                  variant="outlined"
                  fullWidth
                  control= 'input'
                  type="text"
                  label="neighborhood"
                  name="neighborhood"
             />
            </Grid>

             <Grid item xs={12}>
              
                <FormikControl
                  variant="outlined"
                  fullWidth
                  control= 'input'
                  type="text"
                  label="phone"
                  name="phone"
             />
            </Grid>
             
               <Grid item xs={12}>

                 <FormikControl
                  variant="outlined"
                  fullWidth
                  control= 'input'
                  type="password"
                  label="password"
                  name="password"
               />
            </Grid>

            




            <Grid item xs={12}>

                 <FormikControl
                  variant="outlined"
                  fullWidth
                  control= 'input'
                  type="password"
                  label="confirmPassword"
                  name="confirmPassword"
               />
            </Grid>


           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
           
          >
            Update
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="./login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>

       )}
       }
    </Formik>
      
    );
}

export default UpdateUser;