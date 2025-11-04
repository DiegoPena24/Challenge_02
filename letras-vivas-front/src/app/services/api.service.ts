import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });
  }

  
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl.replace('/api', '')}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  createBook(book: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/books`, book, { headers: this.getAuthHeaders() });
  }

  getBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/books`, { headers: this.getAuthHeaders() });
  }

  updateBook(id: number, book: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/${id}`, book, { headers: this.getAuthHeaders() });
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${id}`, { headers: this.getAuthHeaders() });
  }
}
