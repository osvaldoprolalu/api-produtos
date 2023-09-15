SECRET = "neto123"
const jwt = require("jsonwebtoken")

const express = require("express")
const server = express()

const Database = require("./Database.js")
const Produto = require("./Produtos.js")

server.use(express.json())

server.get("/", (req, res) => {
    return res.status(200).send("Bem-vindo")
})

server.post("/login", (req, res, next)=>{
    if(req.body.usuario === "neto" && req.body.senha === "123"){
        //id do usuario logado
        const id = 1;
        const token = jwt.sign({id}, SECRET, {
            expiresIn : 3600 // Expira em 5 minutos

        })
        return res.json({auth : true, token : token})

    }
    return res.status(500),json({mesagem : "Usuario ou senha incorretos"})
})

server.get("/produtos", async (req, res) => {
    
    try {
        const produtos = await Produto.find()

        return res.json(produtos)
    } catch (error) {
        return res.status(500).send(error)
    }
 })

server.post("/produtos", async (req, res) => {
    
    const { descricao, estoque } = req.body

    try {
        const novoProduto = new Produto({
            descricao : descricao,
            estoque : estoque
        })

        const produto = await novoProduto.save()

        return res.json(produto)
    } catch (error) {
        res.status(500).send("Ocorreu um erro ao add produto: " + error)
    }

})

server.put("/produtos/:id", async (req,res) => {
 id = req.params.id
 const { descricao, estoque } = req.body
 
 try {
    const produto = await Produto.findByIdAndUpdate(
        id,
        {
            descricao : descricao,
            estoque : estoque
        },
        { new : true }
    )

    if(!produto) return res.status(500).send("Produto não encontrado")

    return res.send("Produto alterado com sucesso")
    
 } catch (error) {
    
 }
})

server.delete("/produtos/:id", async (req,res) => {
 id = req.params.id
 
 try {
    const produto = await Produto.findByIdAndRemove(id)

    return res.send("Deletado com um incrivel sucesso")
 } catch (error) {
    return res.status(500).send("Erro ao deletar")
 }
 
})

async function startServer() {
    try {
        await Database._connect()

        server.listen(3002, () => {
            console.log("rodando o servidor")
        })
    } catch (error) {
        console.error("Falha ao se conectar no banco: " + error)
    }
}

startServer()