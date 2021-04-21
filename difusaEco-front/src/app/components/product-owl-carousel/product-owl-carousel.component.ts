import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-product-owl-carousel',
  templateUrl: './product-owl-carousel.component.html',
  styleUrls: ['./product-owl-carousel.component.css']
})
export class ProductOwlCarouselComponent implements OnInit {

  produto: Produto = new Produto()
  listaProdutos: Produto[]
  nomeProduto: string
  produtoSelecionado: Produto = new Produto()

  categoria: Categoria = new Categoria()
  listaCategorias: Categoria[]

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit()
  {
    window.scroll(0,0)
    this.findAllCategorias()
    this.findAllProdutos()
  }

  findAllProdutos()
  {
    this.produtoService.getAllProduto().subscribe((resp: Produto[]) =>{
      this.listaProdutos = resp
    })
  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) =>{
      this.listaCategorias = resp
    })
  }

  // Abrir modal com produto selecionado

  selecionarProduto(produto: Produto){
 
    this.produtoSelecionado = produto
    
  }

  /*
   ----------  Funções do Carrinho ----------
  */

   addToCart(produto: Produto) {
    this.produtoService.addToCart(produto);
  }

  // OwlCarousel - Produtos - Responsivo

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      }
    },
    nav: true
  }

}
