import adminRepository from "../repositories/adminRepository.js";

class AdminController {

    async index(request, response) {
        await adminRepository.findAll()
        .then((list)=>
        {
            response.status(200).json(list)
        }).catch((e)=>{
            response.status(400).json(e)
        })
        
    }//lista todos os dados

    async show(request, response) {
        const id = request.params.id;
        if (!id) {
            response.status(404).send('Id user not found')
            return
        }

        await adminRepository.findById(id)
        .then((list)=>
        {
            response.status(200).json(list)
        }).catch((e)=>{
            response.status(400).json(e)
        })

    }//pega por id

    async store(request, response) {
        const newAdmin = request.body

        if (!newAdmin) {
            response.status(400).send('Admin not registered')
            return
        }

        await adminRepository.create(newAdmin)
        .then((adminRegistered)=>
        {
            response.status(200).json(adminRegistered)
        }).catch((e)=>{
            response.status(400).json(e)
        })

    }//cria dados

    async update(request, response) {
        const admin = request.body
        const id = request.params.id

        await adminRepository.update(id, admin)
        .then((adminUpdated)=>
        {
            response.status(200).json(adminUpdated)
        }).catch((e)=>{
            response.status(400).json(e)
        })
        
    }//atualiza dados

    async delete(request, response) {
        const id = request.params.id

        await adminRepository.delete(id)
        .then((adminDeleted)=>
        {
            response.status(200).json(adminDeleted)
        }).catch((e)=>{
            response.status(400).json(e)
        })
        
    }//apaga dados
}

//PADRÃO SINGLETON -> pesquisar sobre 
export default new AdminController()