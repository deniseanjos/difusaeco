import { UtilService } from './../../service/util.service';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoCarrinho } from 'src/app/model/Produto-Carrinho';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-produto-carrinho',
  templateUrl: './produto-carrinho.component.html',
  styleUrls: ['./produto-carrinho.component.css']
})
export class ProdutoCarrinhoComponent implements OnInit {
  public produtoCarrinho: ProdutoCarrinho;
  public qtd: number;
  public novoTotalProduto: number;

  constructor(
    private produtoService: ProdutoService,
    private utilService: UtilService
    ) { }

  @Output() public removeProduct= new EventEmitter();
  @Output() public attValorTotal= new EventEmitter();

  ngOnInit(): void {
  }

  @Input() set produto(val: ProdutoCarrinho) {

    if (val) {
        this.produtoCarrinho = val;
    }
}

  removerProduto(produto: Produto){
    this.produtoService.removeCartProduct(produto);
    this.removeProduct.emit(true);
    this.attValorTotal.emit(true)
  }

  async adicionar(){
    this.produtoService.somaQtdProduto(this.produtoCarrinho);
    this.produtoCarrinho.qtd ++;
    await this.totalProduto();
  }

  async subtrair(){
    if(this.produtoCarrinho.qtd > 1){
      this.produtoService.subtraiQtdProduto(this.produtoCarrinho);
      this.produtoCarrinho.qtd --;
    }
    await this.totalProduto();
  }

  async totalProduto(){
    this.novoTotalProduto = this.produtoCarrinho.produto.preco * this.produtoCarrinho.qtd;
    this.produtoCarrinho.totalProduto = this.novoTotalProduto;
    await this.produtoService.atualizarTotalProduto(this.produtoCarrinho)
    this.attValorTotal.emit(true)
  }


}
