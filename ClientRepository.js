class ClientRepository {
    currentId = 1;
    clients = [];

    constructor(){}

    async create(data){
        const newClient = {id: this.currentId, ...data};
        this.clients.push(newClient);
        this.currentId ++;
        return {id: newClient.id};
    }

    async findById(id){
        return this.clients.find((item)=>item.id == id);
    }

    async list(){
        return this.clients;
    }

    async update(clientId, dataToUpdate){
        const client = await this.findById(clientId);
        const newClient = {...client, ...dataToUpdate};
        await this.delete(clientId);
        this.clients.push(newClient);
        return newClient;
    }
    
    async delete(id){
        this.clients = this.clients.filter((client)=>client.id != id);
    }


}


module.exports = new ClientRepository()