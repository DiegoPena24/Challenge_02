import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['USER', Validators.required]
  });
  message = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  register(): void {
    if (this.form.invalid) return;

    // ✅ Conversión segura
    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';
    const role = this.form.value.role ?? 'USER';

    this.auth.register({ email, password, role }).subscribe({
      next: () => {
        this.message = 'Usuario registrado correctamente';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => (this.message = 'Error al registrar usuario')
    });
  }
}
