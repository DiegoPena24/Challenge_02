package letrasvivas.dto;

import letrasvivas.model.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    public String email;
    public String password;
    public User.Role role;
}