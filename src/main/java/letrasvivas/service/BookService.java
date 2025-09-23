package letrasvivas.service;

import letrasvivas.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BookService {

    Page<Book> getAllBooks(Pageable pageable);

    Book getBookById(Long id);

    Book createBook(Book book);

    // 👇 firma que te falta
    Book updateBook(Long id, Book book);

    void deleteBook(Long id);

    Page<Book> searchBooksByTitle(String title, Pageable pageable);
}
