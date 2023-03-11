const express = require("express");
const Repository = require("./ClientRepository");

const app = express();
app.use(express.json());
const PORT = 3000;


app.post("/", async (req, res)=>{
    const result =  await Repository.create(req.body);
    return res.status(201).json(result);
});

app.put("/:id", async (req, res)=>{
    const {id} = req.params;
    const result = await Repository.update(id, req.body);
    return res.json(result);
})

app.get("/", async (req, res)=>{
    const result = await Repository.list();
    return res.json(result);
});

app.get("/:id", async(req, res)=>{
    const {id} = req.params;
    const result = await Repository.findById(id);
    if (!result) return res.status(404).json({"error": "cliente não encontrado"})
    return res.json(result)
});

app.delete("/:id", async(req, res)=>{
    const {id} = req.params;
    await Repository.delete(id);
    return res.sendStatus(204);
});

app.listen(PORT, (error)=>{
    if(error) console.log(error)
    console.log("Server listening on PORT", PORT);
});