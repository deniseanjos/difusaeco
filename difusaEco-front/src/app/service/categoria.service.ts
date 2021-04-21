import { AuthService } from 'src/app/service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  token={
    headers: new HttpHeaders().set('Authorization', this.authService.getUsuarioLogado().token)
  }

  getAllCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:8080/categoria')
  }

  getByIdCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`http://localhost:8080/categoria/${id}`)
  }

  getByNomeCategoria(nomeCategoria: string): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`http://localhost:8080/categoria/categoria/${nomeCategoria}`)
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>('http://localhost:8080/categoria',categoria, {headers: {'Authorization': this.authService.getUsuarioLogado().token}})
  }

  putCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>('http://localhost:8080/categoria',categoria, {headers: {'Authorization': this.authService.getUsuarioLogado().token}})
  }

  deleteCategoria(id: number) {
    return this.http.delete(`http://localhost:8080/categoria/${id}`,
    {headers: {'Authorization': this.authService.getUsuarioLogado().token}})
  }


}
