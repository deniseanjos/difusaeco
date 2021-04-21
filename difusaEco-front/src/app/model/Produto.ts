import { Categoria } from "./Categoria"

export class Produto{
    public id: number
    public nomeProduto: string
    public descricao: string
    public imagem: string
    public preco: number
    public quantidade: number
    public categoria: Categoria
}