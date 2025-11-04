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

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredBooks = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
    );
  }
}