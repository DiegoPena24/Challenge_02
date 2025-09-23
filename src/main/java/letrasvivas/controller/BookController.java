package letrasvivas.controller;

import letrasvivas.dto.BookRequest;
import letrasvivas.dto.BookResponse;
import letrasvivas.model.Book;
import letrasvivas.service.BookService;
import jakarta.validation.Valid;
import org.springdoc.core.annotations.ParameterObject;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService service;

    @Autowired
    public BookController(BookService service) {
        this.service = service;
    }

    private Book toEntity(BookRequest req) {
        Book b = new Book();
        b.setTitle(req.getTitle());
        b.setAuthor(req.getAuthor());
        b.setPublicationYear(req.getPublicationYear());
        return b;
    }

    private BookResponse toResponse(Book b) {
        return new BookResponse(b.getId(), b.getTitle(), b.getAuthor(), b.getPublicationYear());
    }

    @Operation(summary = "List books with pagination")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Books found")})
    @GetMapping
    public ResponseEntity<Page<BookResponse>> list(@ParameterObject Pageable pageable) {
        Page<Book> page = service.getAllBooks(pageable);
        List<BookResponse> content = page.getContent().stream().map(this::toResponse).collect(Collectors.toList());
        Page<BookResponse> out = new PageImpl<>(content, page.getPageable(), page.getTotalElements());
        return ResponseEntity.ok(out);
    }

    @Operation(summary = "Get a book by its id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = BookResponse.class))),
            @ApiResponse(responseCode = "404", description = "Book not found", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getById(@PathVariable("id") Long id) {
        Book book = service.getBookById(id);
        return ResponseEntity.ok(toResponse(book));
    }

    @Operation(summary = "Create a new book")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Book created",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = BookResponse.class))),
            @ApiResponse(responseCode = "400", description = "Validation error", content = @Content)
    })
    @PostMapping
    public ResponseEntity<BookResponse> create(@Valid @RequestBody BookRequest request) {
        Book created = service.createBook(toEntity(request));
        return ResponseEntity.created(URI.create("/api/books/" + created.getId())).body(toResponse(created));
    }

    @Operation(summary = "Update a book by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book updated",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = BookResponse.class))),
            @ApiResponse(responseCode = "400", description = "Validation error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Book not found", content = @Content)
    })
    @PutMapping("/{id}")
    public ResponseEntity<BookResponse> update(@PathVariable("id") Long id, @Valid @RequestBody BookRequest request) {
        Book updated = service.updateBook(id, toEntity(request));
        return ResponseEntity.ok(toResponse(updated));
    }

    @Operation(summary = "Search books by title with pagination")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Books found")})
    @GetMapping("/search")
    public ResponseEntity<Page<BookResponse>> searchByTitle(@RequestParam String title, @ParameterObject Pageable pageable) {
        Page<Book> page = service.searchBooksByTitle(title, pageable);
        List<BookResponse> content = page.getContent().stream().map(this::toResponse).collect(Collectors.toList());
        Page<BookResponse> out = new PageImpl<>(content, page.getPageable(), page.getTotalElements());
        return ResponseEntity.ok(out);
    }

    @Operation(summary = "Delete a book by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Book deleted"),
            @ApiResponse(responseCode = "404", description = "Book not found", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        service.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
