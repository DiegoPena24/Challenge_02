import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  form = this.fb.group({
    id: [null],
    title: ['', Validators.required],
    author: ['', Validators.required],
    publicationYear: ['', Validators.required]
  });

  books: any[] = [];
  message = '';
  isEditing = false;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.api.getBooks().subscribe({
      next: (res) => {
        this.books = res.content || res; 
      },
      error: (err) => console.error('Error al cargar libros:', err)
    });
  }

  saveBook(): void {
    if (this.form.invalid) {
      this.message = '⚠️ Todos los campos son obligatorios.';
      return;
    }

    const book = {
      title: this.form.value.title ?? '',
      author: this.form.value.author ?? '',
      publicationYear: Number(this.form.value.publicationYear)
    };

    if (this.isEditing && this.form.value.id) {
      // 🔄 Editar libro
      this.api.updateBook(this.form.value.id, book).subscribe({
        next: () => {
          this.message = '✅ Libro actualizado correctamente.';
          this.resetForm();
          this.loadBooks();
        },
        error: (err) => {
          console.error(err);
          this.message = '❌ Error al actualizar el libro.';
        }
      });
    } else {
      // ➕ Agregar libro
      this.api.createBook(book).subscribe({
        next: () => {
          this.message = '✅ Libro agregado correctamente.';
          this.resetForm();
          this.loadBooks();
        },
        error: (err) => {
          console.error(err);
          this.message = '❌ Error al guardar el libro.';
        }
      });
    }
  }

  editBook(book: any): void {
    this.isEditing = true;
    this.form.patchValue(book);
    this.message = '✏️ Editando libro seleccionado.';
  }

  deleteBook(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este libro?')) return;

    this.api.deleteBook(id).subscribe({
      next: () => {
        this.message = '🗑️ Libro eliminado correctamente.';
        this.loadBooks();
      },
      error: (err) => {
        console.error(err);
        this.message = '❌ Error al eliminar el libro.';
      }
    });
  }

  resetForm(): void {
    this.form.reset();
    this.isEditing = false;
    this.message = '';
  }
}
