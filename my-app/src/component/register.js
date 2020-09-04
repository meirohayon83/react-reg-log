import React , {useState} from 'react';
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
import Container from '@material-ui/core/Container';
import {Formik ,Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from '../components/FormikControl'

import axios from 'axios';


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
    marginTop: theme.spacing(4),
  },
  submit: {
    marginTop: theme.spacing(4),
  },
  mar:{
    marginTop: theme.spacing(5),
  }
}));

export default function Register() {

  const [message , setMessage] = useState('');

  const [confirm , setConfirm] = useState();



  const classes = useStyles();

   const initialValues = {
        email: '',
        nickName:'',
        city:'',
        neighborhood:'',
        phone:'',
        password:'',
        confirmPassword:'',
        
    }
    const validationSchema = Yup.object({
        nickName:Yup.string().required('required').min(3).max(150),
        email: Yup.string().required('required').email(),

        city: Yup.string().required('required'),
        neighborhood: Yup.string().required('required'),
        phone: Yup.string().required('required').min(7).max(50),
        password: Yup.string().required('required').min(6).max(20),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match')
         .required('Password confirm is required')
        
    })

      const testEmail = values => {
            return axios.post('http://localhost:3334/login/testEmail', {email: values} )
                    .then(res => {
                      
                         setMessage(res.data.msg)
                           
                    })
                     .catch(err => setMessage('')
            

                     )}

      
 
     
     const onSubmit = values => {
         
        console.log('Form data' ,values);

           axios.post(`http://localhost:3334/register` , values)
           .then(res => {
            const persons = res.data;
            console.log(res.data)
             setConfirm('go to your email address and confirm your registration')

            
       })
        .catch(err => {
          
           setMessage(err.response.data)
        console.log(err.response.data);

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
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                  type="email"
                  label="email"
                  name="email"
                  validate = {testEmail}
                
                  
             />
            </Grid>
            <div >{message}</div>
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
            Sign Up
          </Button>
           <div className = {classes.avatar}>{confirm}</div>
          <div className={classes.paper.mar}>
          <Grid container justify="flex-end" >
            <Grid item >
              <Link href="./login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          </div>
        </Form>
      </div>
     
    </Container>

       )}
       }
    </Formik>
  );
}