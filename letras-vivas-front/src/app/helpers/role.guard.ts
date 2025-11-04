import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole']; 
    const role = this.tokenStorage.getRoleFromToken();

    if (!role) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRole && role.toUpperCase() === expectedRole.toUpperCase()) {
      return true;
    }

    if (role === 'USER') {
      this.router.navigate(['/book']);
    } else if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
}
