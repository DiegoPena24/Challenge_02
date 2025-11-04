import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn = false;
  role: string | null = null;

  constructor(private tokenService: TokenStorageService, private router: Router) {
    this.isLoggedIn = !!this.tokenService.getToken();
    this.role = this.tokenService.getRoleFromToken();
  }

  logout(): void {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }
}
