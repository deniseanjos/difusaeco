import { Component, OnInit } from '@angular/core';
import { ProdutoCarrinho } from 'src/app/model/Produto-Carrinho';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {
  public produtosCarrinho: ProdutoCarrinho[];
  date: number;
  public precoTotal1 = 0;


  constructor(private produtoService: ProdutoService) {
    this.date = Date.now();
    this.getTotal();
  }

  ngOnInit(){
    this.getProdutoCarrinho();
  }

  downloadReceipt() {
    const data = document.getElementById("receipt");
  }

  getProdutoCarrinho(){
    this.produtosCarrinho = this.produtoService.getProdutosCarrinho();
  }

  getTotal(){
    const produtos = this.produtoService.getProdutosCarrinho();

      this.precoTotal1=0;
      produtos.forEach((produto) => {
      this.precoTotal1 += produto.totalProduto;
    });
  }

  limpaCarrinho(){
    this.produtoService.clearCart();
  }
}
