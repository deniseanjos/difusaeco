import { Produto } from "./Produto"

export interface ProdutoCarrinho{
    qtd: number;
    produto: Produto;
    totalProduto: number;
}