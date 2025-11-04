import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) {}

  canActivate(): boolean {
    const role = this.tokenStorage.getRoleFromToken();
    if (role === 'ADMIN') return true;
    this.router.navigate(['/user']);
    return false;
  }
}
