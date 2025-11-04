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
        localStorage.setItem('role', data.role);

        this.message = '✅ Inicio de sesión exitoso.';

        setTimeout(() => {
          const role = data.role?.toUpperCase();
          console.log('Rol detectado:', role);

          if (role === 'ADMIN') {
          } else {
            this.router.navigate(['/admin']);
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
