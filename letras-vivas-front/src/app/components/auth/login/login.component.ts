import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  message = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  login(): void {
  if (this.form.invalid) {
    this.message = 'Por favor completa todos los campos correctamente.';
    return;
  }

  const credentials = {
    email: this.form.value.email ?? '',
    password: this.form.value.password ?? ''
  };

  this.apiService.login(credentials).subscribe({
    next: (data: any) => {
      console.log('Respuesta del backend:', data);

      if (data && data.token) {
        localStorage.setItem('token', data.token);

        // Decodificar el token para obtener el rol
        const decodedToken = this.decodeToken(data.token);
        const role = decodedToken?.role?.toUpperCase().replace(/^ROLE_/, '');
        localStorage.setItem('role', role);

        console.log('Token decodificado:', decodedToken);
        console.log('Rol extraído del token:', role);

        this.message = '✅ Inicio de sesión exitoso.';

        setTimeout(() => {
          if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (role === 'USER') {
            this.router.navigate(['/book']);
          } else {
            console.error('Rol desconocido:', role);
            this.message = '⚠️ Rol desconocido. Contacta al administrador.';
          }
        }, 500);
      } else {
        this.message = '⚠️ No se recibió token. Verifica el backend.';
      }
    },

    error: (err) => {
      console.error('Error al iniciar sesión:', err);
      this.message =
        err.status === 401
          ? '❌ Credenciales incorrectas.'
          : '⚠️ Error al iniciar sesión.';
    }
  });
}
}
