package letrasvivas.controller;

import letrasvivas.dto.LoginRequest;
import letrasvivas.dto.LoginResponse;
import letrasvivas.dto.RegisterRequest;
import letrasvivas.model.User;
import letrasvivas.repository.UserRepository;
import letrasvivas.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthenticationManager authManager;
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authManager, UserRepository userRepo, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.authManager = authManager;
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        if (userRepo.existsByEmail(request.getEmail())) {
            return "El correo ya está registrado.";
        }
        User user = new User(null, request.getEmail(), encoder.encode(request.getPassword()), request.getRole());
        userRepo.save(user);
        return "Usuario registrado con éxito.";
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepo.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new LoginResponse(token);
    }

    @GetMapping("/api/user/hello")
    public String userHello() {
        return "Hola desde /api/user (acceso USER o ADMIN)";
    }

    @GetMapping("/api/admin/hello")
    public String adminHello() {
        return "Hola desde /api/admin (solo ADMIN)";
    }
}
