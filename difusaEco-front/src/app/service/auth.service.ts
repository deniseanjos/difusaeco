import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  post(usuario: Usuario) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', this.getUsuarioLogado().token)
  }


  logar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('http://localhost:8080/usuarios/logar',userLogin)
  }

  cadastrar(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar',user)
  }

  findByIdUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`http://localhost:8080/usuarios/${id}`)
  }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:8080/usuarios')
  }

  editarUsuario(user: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('http://localhost:8080/usuarios',user)
  }

  deleteUsuario(id: number){
    return this.http.delete(`http://localhost:8080/usuarios/${id}`)
  }

  // logado() {
  //   let ok = false

  //   if (environment.token != '') {
  //     ok = true
  //   }
  //   return ok
  // }

  // deslogado() {
  //   let ok = false

  //   if (environment.token == '') {
  //     ok = true
  //   }
  //   return ok
  // }

  adm() {
    let ok = false

    if (environment.tipoUsuario == 'adm') {
      ok = true
    }

    return ok
  }

  /**
        Funções relacionadas ao Local Storage
   */

  saveAuthData(usuario: UserLogin) {
    const userAuth: UserLogin = usuario;
    //const userAuth = usuario.token;
    //localStorage.setItem("userAuth", userAuth);
    localStorage.setItem("userAuth", JSON.stringify(userAuth));
  }


  logoutLocalStorage() {
    localStorage.removeItem("userAuth");
  }

  getUsuarioLogado() {
    let usuarioString = localStorage.getItem('userAuth');
    let usuarioLogado: UserLogin = new UserLogin();
    if(usuarioString) {
      usuarioLogado = JSON.parse(usuarioString || '');
    }
    return usuarioLogado;
  }

  getAuthData() {
    const userAuth = localStorage.getItem("userAuth");
    if(!userAuth){
      return false; //deslogado
    }
    return true; //logado
  }

  usuarioAdm() {
    let verificaTipoUsuario = this.getUsuarioLogado();
    let ok = false;

    if (this.getAuthData()) {
      if (verificaTipoUsuario.tipoUsuario == 'adm'){
        ok = true
      }
    }
    return ok;
  }

}
