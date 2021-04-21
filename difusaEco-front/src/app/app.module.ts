import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { SobreProjetoComponent } from './pages/sobre-projeto/sobre-projeto.component';
import { CardMemberComponent } from './components/card-member/card-member.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdmComponent } from './pages/adm/adm.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { ProdutoCarrinhoComponent } from './components/produto-carrinho/produto-carrinho.component';
import { OrderModule } from 'ngx-order-pipe';
import { ReciboComponent } from './pages/recibo/recibo.component';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductOwlCarouselComponent } from './components/product-owl-carousel/product-owl-carousel.component';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localePt)


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingpageComponent,
    ProdutosComponent,
    SobreProjetoComponent,
    CardMemberComponent,
    ProdutoCarrinhoComponent,
    AdmComponent,
    LoginComponent,
    CarrinhoComponent,
    AdmComponent,
    LoginComponent,
    ReciboComponent,
    ProductOwlCarouselComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    OrderModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxMaskModule.forRoot()
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: "pt-BR"
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
