import express from 'express';
import AdminController from './app/controllers/adminController.js';

const app = express()
app.use(express.json())//express read the body as json

app.get('/', (req, res)=>{
    res.send("Welcome to Esmeralda API!")
})

app.get('/admin', AdminController.index)

app.get('/admin/:id', AdminController.show)

app.post('/admin', AdminController.store)

app.put('/admin/:id', AdminController.update)

app.delete('/admin/:id', AdminController.delete)



export default app;