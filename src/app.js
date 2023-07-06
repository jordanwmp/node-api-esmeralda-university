import express from 'express';
import AdminController from './app/controllers/adminController.js';
import env from 'dotenv-safe';
import jwt from 'jsonwebtoken';

env.config();

const app = express()
app.use(express.json())//express read the body as json

//authentication

app.post('/login', (request, response, next)=>{
    if(request.body.user === 'jordan' && request.body.password === '123')
    {
        //auth ok
        const id = 1;
        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 300
        })
        return response.json({auth: true, token: token})
    }

    response.status(500).json({message: "Invalid user"})
})

app.post('/logout', (request, response)=>{
    response.json({auth: false, token: null})
})

function verifyJWT(request, response, next)
{
    const token = request.headers['x-access-token'];
    if(!token) return response.status(401).json({auth: false, message: "No token provided"})

    jwt.verify(token, process.env.SECRET, (error, decoder)=>{
        if(error) return response.status(500).json({auth: false, message: "Failed to authenticate token"})

        request.userId = decoder.id;
        next()
    })
}

app.get('/', (req, res)=>{
    res.send("Welcome to Esmeralda API!")
})

app.get('/admin', verifyJWT, AdminController.index)

app.get('/admin/:id', AdminController.show)

app.post('/admin', AdminController.store)

app.put('/admin/:id', AdminController.update)

app.delete('/admin/:id', AdminController.delete)



export default app;