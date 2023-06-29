import express from 'express';

const app = express()
app.use(express.json())//express read the body as json

//mock - basic structure for test data 
const admin = [
    {
        id: 1,
        name: 'JNair Marlene Almada',
        username: 'marlene.almada',
        email: 'nair_marlene_almada@megamega.com.br',
        password: 'password'
    },
    {
        id: 2,
        name: 'Stefany Renata Pietra Corte Real',
        username: 'stefany_cortereal',
        email: 'stefany_cortereal@dpi.ig.br',
        password: 'password'
    }
]


function getAdminById(id)
{
    return admin.filter(ad=> { return ad.id == id })
}

function getIndexAdminById(id)
{
    return admin.findIndex((ad) => { return ad.id == id})
}


app.get('/', (req, res)=>{
    res.send("Welcome to Esmeralda API!")
})

app.get('/admin', (request, response)=>{
    response.status(200).send(admin)
})

app.get('/admin/:id', (request, response)=>{
    const id = request.params.id;
    
    if(!id)
    {
        response.status(400).send('Id user not found')
        return
    }
    const admin = getAdminById(id);
    
    if(!admin.length)
    {
        response.status(400).send('Admin not found')
        return
    }

    response.status(201).json(admin)

})

app.post('/admin', (request, response)=>{
    const newAdmin = request.body
    
    if(!newAdmin)
    {
        response.status(400).send('Admin not registered')
        return    
    }

    admin.push(newAdmin)
    response.status(201).send('Admin successfully registered')
})

app.delete('/admin/:id', (request, response)=>{
    const id = request.params.id
    const index = getIndexAdminById(id)
    if(admin.splice(index, 1))
    {
        response.status(201).send(`Admin deleted on position ${index}`)
        return
    }
    response.status(400).send(`Erro on delete admin`)
})

app.put('/admin/:id', (request, response)=>{
    
    const id = request.params.id
    const body = request.body
    const index = getIndexAdminById(id)
    
    if(admin[index] = body)
    {
        response.status(201).send(`Admin updated successfully on index ${index}`)
        return
    }

    response.status(400).send(`Error updated successfully`)

})

export default app;