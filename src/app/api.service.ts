import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  baseUrl = 'http://localhost:3000/';
  get(url: string) {
    const req = this.http.get(this.baseUrl + url);
    return req;
  };
}
