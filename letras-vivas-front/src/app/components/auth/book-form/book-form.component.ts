import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    year: [new Date().getFullYear(), Validators.required]
  });
  message = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  saveBook(): void {
    if (this.form.invalid) return;

    // ✅ Conversión segura para evitar null / undefined
    const title = this.form.value.title ?? '';
    const author = this.form.value.author ?? '';
    const year = Number(this.form.value.year ?? new Date().getFullYear());

    this.apiService.createProject({ title, author, year }).subscribe({
      next: () => (this.message = 'Libro agregado correctamente'),
      error: () => (this.message = 'Error al guardar libro')
    });
  }
}
