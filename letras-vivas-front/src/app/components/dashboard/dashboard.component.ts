import { Component } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  template: `
  <div style="padding:20px">
    <h2>Bienvenido {{ token.getUser() || 'Usuario' }}</h2>
    <p>Desde aquí administra tus proyectos. <a routerLink="/projects">Ir a Proyectos</a></p>
  </div>`
})
export class DashboardComponent {
  constructor(public token: TokenStorageService) {}
}
