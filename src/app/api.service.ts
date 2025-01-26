import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://mnemosineapi.sobrero.dev/'; // Change this URL as needed
  //baseUrl = 'http://localhost:3000/'; // Change this URL as needed
  tokenKey = 'token'; // Local Storage key for token

  constructor(private http: HttpClient) {}

  // General GET request
  get(url: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(this.baseUrl + url, { headers });
  }

  // General POST request
  post(url: string, data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.baseUrl + url, data, { headers });
  }

  // Login method to get the token
  login(endpoint: string, credentials: any): Observable<any> {
    return this.http.post(this.baseUrl + endpoint, credentials);
  }

  // Save JWT token to Local Storage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve JWT token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Delete token (Logout method)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Helper method to add Authorization header with JWT
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': token, // Attach the token
      });
    }
    return new HttpHeaders(); // Return empty headers if no token
  }
}
