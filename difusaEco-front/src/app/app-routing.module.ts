import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdmComponent } from './pages/adm/adm.component';
import { LoginComponent } from './components/login/login.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { SobreProjetoComponent } from './pages/sobre-projeto/sobre-projeto.component';
import { ReciboComponent } from './pages/recibo/recibo.component';


const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', component: LandingpageComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'sobre-projeto', component: SobreProjetoComponent},

  {path: 'adm', component: AdmComponent},
  {path: 'login', component: LoginComponent},

  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'carrinho/recibo', component: ReciboComponent},

  {path: 'adm', component: AdmComponent},
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
