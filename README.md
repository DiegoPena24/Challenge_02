# Letras Vivas API

REST API built with Spring Boot 3, Hibernate, and Spring Data JPA.
Includes DTO validation, centralized error handling, pagination/sorting, search, and Swagger/OpenAPI docs.

## Run
```bash
mvn clean package
./mvnw spring-boot:run
```

## Documentation
- Swagger UI: http://localhost:8080/swagger-ui/index.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs
- H2 Console: http://localhost:8080/h2-console (JDBC: jdbc:h2:mem:letrasdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE, user: sa)

## Endpoints
- `GET /api/books?page=&size=&sort=` — list paged/sorted
- `POST /api/books` — create (validated with @Valid)
- `GET /api/books/{id}` — get by id (404 if not found)
- `PUT /api/books/{id}` — update (validated with @Valid)
- `DELETE /api/books/{id}` — delete (204 on success)
- `GET /api/books/search?title=&page=&size=` — search with pagination

## Validation & Error Handling
- DTOs: `BookRequest` uses `@NotBlank`, `@Size`, `@Min`, `@Max`. `publicationYear` is optional (`Integer`): if provided, must be between 1400 and 2100.
- Controllers validate raw JSON with `@Valid @RequestBody`.
- Global error handling via `@ControllerAdvice`, uniform JSON structure:
```json
{ "status": 400, "error": "Bad Request", "message": "Field 'title' must not be blank", "timestamp": "..." }
```
