class ProdutosServico{
    constructor(){}

    produtos = [
        {"id" : 1, "descricao" : "PS5", "estoque" : false},
        {"id" : 2, "descricao" : "Xbox Serie X","estoque" : false},
        {"id" : 3, "descricao" : "iPhone 15 PRO", "estoque" : false},
        {"id" : 4, "descricao" : "iPhone 15 PRO MAX", "estoque" : false}
    ]

    getProduto (){
        return this.produtos;
    }
    addProduto(produto){
        return this.produtos.push(produto)
    }

    alterarProduto(id,produto){
        const objProduto = this.produtos.find(p => p.id == id)

        if(!objProduto){
            return false
        }
        objProduto.descricao = produto.descricao
        objProduto.estoque = produto.estoque
        return true
    }

    deletaProduto(id){
        const produtoIndex = this.produtos.findIndex(p => p.id == id)

        if(!produtoIndex){
            return false
        }
        this.produtos.splice(produtoIndex,1)
        return true
    }
}
module.exports = ProdutosServico