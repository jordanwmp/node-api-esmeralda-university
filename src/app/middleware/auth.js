import jwt from 'jsonwebtoken';
import env from 'dotenv-safe';
env.config();

class Auth
{
    
    verifyJWT(request, response, next)
    {
        const token = request.headers['access-token'];
        if(!token) return response.status(401).json({auth: false, message: "No token provided"})

        jwt.verify(token, process.env.SECRET, (error, decoder)=>{
            if(error) return response.status(500).json({auth: false, message: "Failed to authenticate token"})

            request.email = decoder.email;
            next()
        })
    }

    generateToken(email)
    {
        //if(request.body.email === email && request.body.password === password)
        //{
            //auth ok
            const token = jwt.sign({email}, process.env.SECRET, {
                expiresIn: 300
            })
            return {auth: true, token: token}
            //return response.json({auth: true, token: token})
        //}
    
        //response.status(500).json({message: "Invalid user"})
    }

} 

export default new Auth()