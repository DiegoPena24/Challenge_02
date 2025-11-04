package letrasvivas.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class BookRequest {

    @NotBlank(message = "El título no puede estar vacío")
    @Size(max = 200, message = "El título no puede superar los 200 caracteres")
    private String title;

    @NotBlank(message = "El autor no puede estar vacío")
    @Size(max = 120, message = "El autor no puede superar los 120 caracteres")
    private String author;

    @NotNull(message = "El año de publicación es obligatorio") // ✅ agregado
    @Min(value = 1400, message = "El año debe ser mayor o igual a 1400")
    @Max(value = 2100, message = "El año debe ser menor o igual a 2100")
    private Integer publicationYear;

    // Getters y setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public Integer getPublicationYear() { return publicationYear; }
    public void setPublicationYear(Integer publicationYear) { this.publicationYear = publicationYear; }
}
