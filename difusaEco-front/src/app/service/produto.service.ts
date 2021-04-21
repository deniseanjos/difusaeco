import { UtilService } from './util.service';
import { ProdutoCarrinho } from './../model/Produto-Carrinho';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  public qtdProdutosCarrinho = new Subject<any>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private utilService: UtilService
    ) {
    this.atualizaQtdCarrinho();
  }

  token = {
    headers: new HttpHeaders().set(
      'Authorization',
      this.authService.getUsuarioLogado().token
    ),
  };

  getAllProduto(): Observable<Produto[]> {
    return this.http.get<Produto[]>('http://localhost:8080/produto');
  }

  getByIdProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`http://localhost:8080/produto/${id}`);
  }

  getByNomeProduto(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(
      `http://localhost:8080/produto/produto/${nome}`
    );
  }

  postProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>('http://localhost:8080/produto', produto, {
      headers: { Authorization: this.authService.getUsuarioLogado().token },
    });
  }

  putProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>('http://localhost:8080/produto', produto, {
      headers: { Authorization: this.authService.getUsuarioLogado().token },
    });
  }

  deleteProduto(id: number) {
    return this.http.delete(`http://localhost:8080/produto/${id}`, {
      headers: { Authorization: this.authService.getUsuarioLogado().token },
    });
  }

  /*
   ----------  Funções do Carrinho ----------
  */

  addToCart(produto: Produto) {
    const carrinho: ProdutoCarrinho[] = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );

    const produtoCarrinho: ProdutoCarrinho = {
      qtd: 1,
      produto: produto,
      totalProduto: produto.preco,
    };

    let produtoExiste = false;
    if(carrinho.length > 0){
      for (const i in carrinho) {
        if (carrinho[i].produto.id == produtoCarrinho.produto.id) {
          produtoExiste = true;
          break;
        }
      }
    }

    if(produtoExiste){
      this.utilService.showToast('Produto já está no carrinho', 'info');

    } else {
      carrinho.push(produtoCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      this.atualizaQtdCarrinho()

      this.utilService.showToast('Produto adicionado ao carrinho!');
    }
  }


  // GET PRODUTOS
  getProdutosCarrinho(): ProdutoCarrinho[] {
    const carrinho: ProdutoCarrinho[] = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );
    return carrinho;
  }
  // REMOVER PRODUTO DO CARRINHO
  removeCartProduct(produto: Produto) {
    let carrinho: ProdutoCarrinho[] = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );

    carrinho = carrinho.filter((item) => item.produto.id !== produto.id);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    this.atualizaQtdCarrinho();
    this.utilService.showToast('Produto removido do carrinho!');
  }

  // QUANTIDADE NO CARRINHO
  async atualizaQtdCarrinho() {
    const carrinho = await this.getProdutosCarrinho();
    this.qtdProdutosCarrinho.next(carrinho);
  }

  // SOMA
  somaQtdProduto(produtoCarrinho: ProdutoCarrinho) {
    let carrinho: ProdutoCarrinho[] = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );

    for (const i in carrinho) {
      if (carrinho[i].produto.id == produtoCarrinho.produto.id) {
        carrinho[i].qtd += 1;
        break;
      }
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  // SUBTRAÇÃO

  subtraiQtdProduto(produtoCarrinho: ProdutoCarrinho) {
    let carrinho: ProdutoCarrinho[] = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );

    for (const i in carrinho) {
      if (carrinho[i].produto.id == produtoCarrinho.produto.id) {
        if (carrinho[i].qtd > 1) {
          carrinho[i].qtd -= 1;
        }
        break;
      }
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  atualizarTotalProduto(produtoCarrinho: ProdutoCarrinho) {
    let carrinho: ProdutoCarrinho[] = JSON.parse(
      localStorage.getItem('carrinho') || '[]'
    );

    for (const i in carrinho) {
      if (carrinho[i].produto.id == produtoCarrinho.produto.id) {
        carrinho[i].totalProduto = produtoCarrinho.totalProduto;
        break;
      }
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  clearCart(){

    // this.getProdutosCarrinho()
    // localStorage.clear()

    //localStorage.getItem('carrinho');
    localStorage.removeItem('carrinho');
    this.atualizaQtdCarrinho();



  }
}
