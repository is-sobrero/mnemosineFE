import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token'); // Check for JWT in local storage

    if (token) {
      return true; // Token exists: allow access to the route
    }

    // If no token: redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
