import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  searchTerm: string = '';
  message = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.apiService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.filteredBooks = data;
        if (this.books.length === 0) {
          this.message = 'No hay libros registrados todavía.';
        }
      },
      error: (err) => {
        console.error('Error al obtener libros:', err);
        this.message = '⚠️ Error al cargar los libros.';
      }
    });
  }

  performSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredBooks = this.books;
      this.message = '';
      return;
    }

    this.message = '🔍 Buscando libros...';

    // Usar búsqueda local por ahora, ya que el endpoint de búsqueda puede no existir
    this.fallbackLocalSearch();
  }

  private fallbackLocalSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredBooks = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
    );

    if (this.filteredBooks.length === 0) {
      this.message = '❌ No se encontraron libros que coincidan con tu búsqueda.';
    } else {
      this.message = `✅ Encontrados ${this.filteredBooks.length} libro(s).`;
    }
  }
}