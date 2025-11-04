import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenStorageService } from '../../../services/token-storage.service';

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
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

 login(): void {
  if (this.form.invalid) return;
  this.loading = true;

  const email = this.form.value.email ?? '';      // convierte null → ''
  const password = this.form.value.password ?? ''; // convierte null → ''

  this.auth.login({ email, password }).subscribe({
    next: (res) => {
      this.tokenStorage.saveToken(res.token);
      const role = this.tokenStorage.getRoleFromToken();
      this.router.navigate([role === 'ADMIN' ? '/admin' : '/user']);
    },
    error: () => {
      this.error = 'Credenciales inválidas';
      this.loading = false;
    }
  });
}
}
