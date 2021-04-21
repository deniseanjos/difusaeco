import { ProdutoCarrinho } from './../../model/Produto-Carrinho';
import { ProdutoService } from 'src/app/service/produto.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nomeUsuario = environment.nomeUsuario
  token = environment.token
  id = environment.id


  public qtdCarrinho: number;

  constructor(
    public produtoService: ProdutoService,

    public authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.produtoService.qtdProdutosCarrinho.subscribe((carrinho: ProdutoCarrinho[] ) => {
      if (carrinho) {
          this.qtdCarrinho = carrinho.length;
      }
    });
  }

  sair(){
    this.authService.logoutLocalStorage();
    this.router.navigate(['/home'])
  }
}
