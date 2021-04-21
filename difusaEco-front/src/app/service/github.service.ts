import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private url = 'https://api.github.com/';

  constructor(
    private http: HttpClient,

  ) { }

  getUser(user: string){
    return this.http.get(`${this.url}users/${user}`).toPromise()
  }


}
