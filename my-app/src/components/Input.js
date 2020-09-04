import React from 'react';
import{Field ,ErrorMessage} from 'formik'
import TextError from './TextError'
import TextField from '@material-ui/core/TextField';

 

function Input(props){
    const { label, name , ...rest} = props

    return(
        <div className = 'form-control'>
        
         {/* <label htmlFor ={name}>{label}</label> */}
         
         <Field as={TextField}   id={name} name={name} label={label} {...rest}  /> 
            
          
         <ErrorMessage name={name} component={TextError} />
        
        </div>
    )


}

export default Input