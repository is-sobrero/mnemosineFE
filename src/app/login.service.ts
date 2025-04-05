import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  login(username: string, password: string) {
    this.api.post('auth/login', { username, password }).subscribe((res: any) => {
      console.log(res);

      if (res.token !== undefined) {
        localStorage.setItem('token', res.token);
        //decode token
        const token = res.token.split('.')[1];
        const decodedToken = JSON.parse(atob(token));
        localStorage.setItem('userInfos', JSON.stringify(decodedToken));
        alert('Login effettuato con successo');
        this.router.navigate(['/home']);
      } else {
        alert('Errore durante il login');
      }
    });
  }
  adminLogin(username: string, password: string) {
    this.api.post('auth/adminLogin', { username, password }).subscribe((res: any) => {
      console.log(res);

      if (res.token !== undefined) {
        localStorage.setItem('token', res.token);
        //decode token
        const token = res.token.split('.')[1];
        const decodedToken = JSON.parse(atob(token));
        localStorage.setItem('userInfos', JSON.stringify(decodedToken));
        alert('Login effettuato con successo');
        this.router.navigate(['/dashboard']);
      } else {
        alert('Errore durante il login');
      }
    });
  }
}
