const jwt = require('jsonwebtoken')

module.exports = {

    auth: (req,res,next) => {
      const token = req.headers.token
      try {
        const decoded = jwt.verify(token, 'keysecret')
        console.log(decoded) 
        if(decoded){
          req.user = decoded.user
          next()
        }else{
          res.status(403).json({
            message: 'Invalid Tokenasd'
          })
        }
      } catch(err) {
        console.log(err) 
          res.status(403).json({
            message: 'Invalid Token'
          })
      }
    }

}
