import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoCarrinho } from 'src/app/model/Produto-Carrinho';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  produtosCarrinho: ProdutoCarrinho[];
  carrinhoFinal:  ProdutoCarrinho[];
  precoTotal = 0;

  constructor(private produtoService: ProdutoService) {
    this.getTotal();
  }

  ngOnInit() {
    this.getProdutoCarrinho();
  }

  getProdutoCarrinho(){
    this.produtosCarrinho = this.produtoService.getProdutosCarrinho();
  }

  getTotal(){
    const produtos = this.produtoService.getProdutosCarrinho();
    this.carrinhoFinal = produtos;

      this.precoTotal=0;
      produtos.forEach((produto) => {
      this.precoTotal += produto.totalProduto;
    });
  }

}
