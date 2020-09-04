import React , {useState , useEffect} from 'react';
import {useParams} from 'react-router-dom';
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


export default  function ChangePassword() {

  const [pass , setPass ] = useState(false)

      let {token} = useParams()
       
    //   let tok = token.slice(5)

    useEffect(() => {

       axios.get(`http://localhost:3334/forget/pass/${token}`)
       .then(res => {
           
           setPass(true)
          
        })

        .catch(err => {
           setPass(false)

      });
 
},[token])

//  let tok = localStorage.getItem('token')

    const classes = useStyles();

   const initialValues = {
        
        activeToken: token,
        password:'',
        confirmPassword:''

        
    }
    const validationSchema = Yup.object({
      
        
        password: Yup.string().required('required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match')
         .required('Password confirm is required')
        
    })


 
    
    const onSubmit = values => {
         
        console.log('Form data' ,values);
        
       
        // const seti = setData({...data ,...values})

      axios.post(`http://localhost:3334/changePassword` , values)
      .then(res => {
        const persons = res.data;
        console.log(res.data)

          localStorage.clear()
          sessionStorage.clear()

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

    
      
    {pass ?  <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
           update your password
        </Typography>
        
        <Form className={classes.form} noValidate>
         
           <FormikControl
                  variant="outlined"
                  fullWidth
                  control= 'input'
                  type="password"
                  label="password"
                  name="password"
             />
         
              <FormikControl
                  variant="outlined"
                  fullWidth
                  control= 'input'
                  type="password"
                  label="confirmPassword"
                  name="confirmPassword"
               />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            Send
          </Button>
         
        </Form>
      </div>

        : <div className={classes.paper}>link not found</div>} 

    </Container>


       )}}

    </Formik>

        

    );
}

