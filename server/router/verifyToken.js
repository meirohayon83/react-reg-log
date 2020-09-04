const jwt = require ('jsonwebtoken')


// check the token if verify in every route that inport
 
  module.exports = function verify (req, res, next) {

    const head = req.headers['authorization']
  
    if (typeof head !== "undefined") {
  
      const bearer = head.split(' ')[1];

      // const verified = jwt.verify(bearer, process.env.TOKEN_SECRET)
      const verified = jwt.verify(bearer, process.env.TOKEN_SECRET , function(err, token) {

        if(err){ 
          return res.status(401).send(err.message),
          console.log(err);
          
        
        }

        req.activeToken = bearer
        next()

        // res.status(200).send(token);
      
      })
    }}


      // if(!verified) {
        
      //   return res.status(401).send('Unauthorized request')    
      // }
    
      // req.activeToken = bearer

      // req.token = bearer

      // const verified = jwt.verify(bearer, secret)
  
    //   // next()
    // } else {
  
    //    res.sendStatus(403)
     
    // }
  
  // }








  // module.exports = function verify (req, res, next) {
  //   if(!req.headers.authorization) {
  //     return res.status(401).send('Unauthorized request')
  //   }
  //   let bearer = req.headers.authorization.split(' ')[1]
  //   if(bearer === 'null') {
  //     return res.status(401).send('Unauthorized request')    
  //   }
  //   let payload = jwt.verify(bearer, secret)
  //   if(!payload) {
  //     return res.status(401).send('Unauthorized request')    
  //   }
  //   req.token = bearer
  //   next()
  // }