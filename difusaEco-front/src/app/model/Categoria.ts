import { Produto } from "./Produto"

export class Categoria {
    public id: number
    public nomeCategoria: string
    public ativo: boolean
    public produto: Produto[]
}