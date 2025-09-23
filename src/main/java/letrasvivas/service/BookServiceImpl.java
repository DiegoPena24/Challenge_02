package letrasvivas.service;

import letrasvivas.exception.ResourceNotFoundException;
import letrasvivas.model.Book;
import letrasvivas.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository repository;

    @Autowired
    public BookServiceImpl(BookRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<Book> getAllBooks(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Book getBookById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book with id " + id + " not found"));
    }

    @Override
    public Book createBook(Book book) {
        return repository.save(book);
    }

    @Override
    public Book updateBook(Long id, Book book) {
        Book existing = getBookById(id); // lanza 404 si no existe
        existing.setTitle(book.getTitle());
        existing.setAuthor(book.getAuthor());
        existing.setPublicationYear(book.getPublicationYear());
        return repository.save(existing);
    }

    @Override
    public void deleteBook(Long id) {
        Book existing = getBookById(id); // 404 si no existe
        repository.delete(existing);
    }

    @Override
    public Page<Book> searchBooksByTitle(String title, Pageable pageable) {
        return repository.findByTitleContainingIgnoreCase(title, pageable);
    }
}
