import jwt from 'jsonwebtoken'

class Auth {

    static Auth_getKaryawan (req,res,next) {
        
       const headers = req.headers
       const Authorization_Bearer = headers.authorization.split(' ')[1]
       if(!Authorization_Bearer) return res.status(401).send('No Authorization')

       const verify = jwt.verify(Authorization_Bearer,process.env.TOKEN_RAHASIA,(err,decoded) => {
        if(err) return res.status(401).send('No Authorization')
        if(decoded) {
            next()  
        }
       })

       
    }

}


export default Auth