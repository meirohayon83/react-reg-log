const Joi = require('@hapi/joi')

const registerValidation = (data) => {

    const schema = Joi.object().keys( {

       
      
        nickName: Joi.string()
                     .min(4)
                     .required(),
        phone: Joi.string()
                     .min(7)
                     .required(),
         city: Joi.string()
                     .min(4)
                     .required(),
        neighborhood: Joi.string()
                      .required(),  
        email: Joi.string()
                  .min(6)
                  .required()
                  .email(),
    
        password: Joi.string()
                     .min(6)
                     .required(),
        confirmPassword:Joi.string()
                           .min(6)
                           .required()
           
                              



    })
    return schema.validate(data);
}



const loginValidation = (data) => {

    const schema =  Joi.object().keys( { 

        email: Joi.string()
                  .min(6)
                  .required()
                  .email(),
        password: Joi.string()
                     .min(6)
                     .required()
    })
    return schema.validate(data);


}






module.exports.registerValidation = registerValidation;
 module.exports.loginValidation = loginValidation;
 